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
            let ignore_remote_media = {
                let mgr = manager.lock().await;
                mgr.state.cfg.as_ref().map(|c| c.ignore_remote_media).unwrap_or(false)
            };

            let playing = check_media_playing(ignore_remote_media);
            if playing {
                // use manager helper to ensure consistent side-effects/logging
                let mut mgr = manager.lock().await;
                if !mgr.state.media_playing {
                    incr_active_inhibitor(&mut mgr).await;
                    mgr.state.media_playing = true;
                }
            }
        }

        loop {
            if let Some(_msg) = stream.next().await {
                let ignore_remote_media = {
                    let mgr = manager.lock().await;
                    mgr.state.cfg.as_ref().map(|c| c.ignore_remote_media).unwrap_or(false)
                };

                let any_playing = check_media_playing(ignore_remote_media);

                let mut mgr = manager.lock().await;
                if any_playing && !mgr.state.media_playing {
                    incr_active_inhibitor(&mut mgr).await;
                    mgr.state.media_playing = true;
                } else if !any_playing && mgr.state.media_playing {
                    decr_active_inhibitor(&mut mgr).await;
                    mgr.state.media_playing = false;
                }
            }
        }
    });
    Ok(())
}

pub fn check_media_playing(ignore_remote_media: bool) -> bool {
    // Step 1: Check MPRIS players
    let mpris_playing = match PlayerFinder::new() {
        Ok(finder) => match finder.find_all() {
            Ok(players) => players.iter().any(|player| {
                let identity = player.identity();
                let bus_name = player.bus_name().to_string();
                let is_playing = player.get_playback_status()
                    .map(|s| s == PlaybackStatus::Playing)
                    .unwrap_or(false);

                if !is_playing { return false; }

                if ignore_remote_media {
                    !IGNORED_PLAYERS.iter().any(|s| identity.contains(s) || bus_name.contains(s))
                } else {
                    true
                }
            }),
            Err(_) => false,
        },
        Err(_) => false,
    };

    if !mpris_playing {
        return false;
    }

    if ignore_remote_media {
        check_local_audio()
    } else {
        true
    }
}

fn check_local_audio() -> bool {
    let output = match Command::new("pactl").args(["list", "sink-inputs"]).output() {
        Ok(o) => o,
        Err(_) => return false, // can't detect audio, assume none
    };

    let stdout = String::from_utf8_lossy(&output.stdout);

    stdout.lines().any(|line| line.contains("State: RUNNING"))
}

