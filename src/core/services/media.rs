use std::{process::Command, sync::Arc};
use eyre::Result;
use futures_util::stream::StreamExt;
use mpris::{PlayerFinder, PlaybackStatus};
use tokio::task;
use zbus::{Connection, MatchRule, MessageStream};

use crate::core::manager::{helpers::{decr_active_inhibitor, incr_active_inhibitor}, Manager};

const IGNORED_PLAYERS: &[&str] = &[
    "KDE Connect", "kdeconnect", "Chromecast", "chromecast",
    "Spotify Connect", "spotifyd", "vlc-http", "plexamp", "bluez",
];

pub async fn spawn_media_monitor_dbus(manager: Arc<tokio::sync::Mutex<Manager>>) -> Result<()> {
    task::spawn(async move {
        let conn = match Connection::session().await {
            Ok(c) => c,
            Err(e) => {
                crate::log::log_error_message(&format!("Failed to connect to D-Bus: {}", e));
                return;
            }
        };

        let rule = MatchRule::builder()
            .msg_type(zbus::message::Type::Signal)
            .interface("org.freedesktop.DBus.Properties")
            .unwrap()
            .member("PropertiesChanged")
            .unwrap()
            .path_namespace("/org/mpris/MediaPlayer2")
            .unwrap()
            .build();

        let mut stream = MessageStream::for_match_rule(rule, &conn, None).await.unwrap();

        // Initial check
        {
            let (ignore_remote_media, media_blacklist) = {
                let mgr = manager.lock().await;
                let ignore = mgr.state.cfg.as_ref().map(|c| c.ignore_remote_media).unwrap_or(false);
                let blacklist = mgr.state.cfg.as_ref().map(|c| c.media_blacklist.clone()).unwrap_or_default();
                (ignore, blacklist)
            };

            let playing = check_media_playing(ignore_remote_media, &media_blacklist);
            if playing {
                // use manager helper to ensure consistent side-effects/logging
                let mut mgr = manager.lock().await;
                if !mgr.state.media_playing {
                    incr_active_inhibitor(&mut mgr).await;
                    mgr.state.media_playing = true;
                    mgr.state.media_blocking = true;
                }
            }
        }

        loop {
            if let Some(_msg) = stream.next().await {
                let (ignore_remote_media, media_blacklist) = {
                    let mgr = manager.lock().await;
                    let ignore = mgr.state.cfg.as_ref().map(|c| c.ignore_remote_media).unwrap_or(false);
                    let blacklist = mgr.state.cfg.as_ref().map(|c| c.media_blacklist.clone()).unwrap_or_default();
                    (ignore, blacklist)
                };

                let any_playing = check_media_playing(ignore_remote_media, &media_blacklist);

                let mut mgr = manager.lock().await;
                if any_playing && !mgr.state.media_playing {
                    incr_active_inhibitor(&mut mgr).await;
                    mgr.state.media_playing = true;
                    mgr.state.media_blocking = true;
                } else if !any_playing && mgr.state.media_playing {
                    decr_active_inhibitor(&mut mgr).await;
                    mgr.state.media_playing = false;
                    mgr.state.media_blocking = false;
                }
            }
        }
    });
    Ok(())
}

pub fn check_media_playing(ignore_remote_media: bool, media_blacklist: &[String]) -> bool {
    // Step 1: Check if ANY MPRIS player is playing (filter blacklist and remote)
    let any_mpris_playing = match PlayerFinder::new() {
        Ok(finder) => match finder.find_all() {
            Ok(players) => {
                players.iter().any(|player| {
                    let is_playing = player.get_playback_status()
                        .map(|s| s == PlaybackStatus::Playing)
                        .unwrap_or(false);
                    
                    if !is_playing {
                        return false;
                    }
                    
                    let identity = player.identity().to_lowercase();
                    let bus_name = player.bus_name().to_string().to_lowercase();
                    
                    // Check blacklist first (applies regardless of ignore_remote_media)
                    if media_blacklist.iter().any(|b| identity.contains(b) || bus_name.contains(b)) {
                        return false;
                    }
                    
                    // If ignore_remote_media is true, also filter remote players
                    if ignore_remote_media {
                        let is_remote = IGNORED_PLAYERS.iter().any(|s| {
                            let s_lower = s.to_lowercase();
                            identity.contains(&s_lower) || bus_name.contains(&s_lower)
                        });
                        !is_remote
                    } else {
                        true
                    }
                })
            },
            Err(_) => false,
        },
        Err(_) => false,
    };

    // If no MPRIS player is playing at all, return false
    if !any_mpris_playing {
        return false;
    }

    // Step 2: If we're ignoring remote media, verify local audio is actually playing
    if ignore_remote_media {
        check_local_audio()
    } else {
        // If we're not filtering remote media, any MPRIS player is enough
        true
    }
}

fn check_local_audio() -> bool {
    // Small delay to allow sink state to update after MPRIS detection
    std::thread::sleep(std::time::Duration::from_millis(300));
    
    let output = match Command::new("pactl").args(["list", "sinks", "short"]).output() {
        Ok(o) => o,
        Err(_) => return false,
    };

    let stdout = String::from_utf8_lossy(&output.stdout);
    
    // Check if any sink is in RUNNING state
    stdout.lines().any(|line| line.to_uppercase().contains("RUNNING"))
}
