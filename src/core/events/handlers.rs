use std::{sync::Arc, time::Duration};
use tokio::sync::Mutex;

use crate::{config::model::{IdleAction, LidCloseAction, LidOpenAction}, core::manager::{helpers::{run_action, wake_idle_tasks}, Manager}};
use crate::log::log_message;

pub enum Event {
    InputActivity,
    MediaPlaybackActive,
    MediaPlaybackEnded,
    ACConnected,
    ACDisconnected,
    LockScreenDetected,
    Suspend,
    Wake,
    Resume,
    LidClosed,
    LidOpened,
}

pub async fn handle_event(manager: &Arc<Mutex<Manager>>, event: Event) {
    match event {
        Event::InputActivity => {
            let mut mgr = manager.lock().await;
            mgr.reset().await;
            mgr.state.lock_notify.notify_waiters();
            wake_idle_tasks(&mgr.state);
        }
        
        Event::ACConnected => {
            let mut mgr = manager.lock().await;
            if mgr.state.is_laptop() {
                mgr.state.set_on_battery(false);
                wake_idle_tasks(&mgr.state);
            }
        }

        Event::ACDisconnected => {
            let mut mgr = manager.lock().await;
            if mgr.state.is_laptop() {
                mgr.state.set_on_battery(true);
                wake_idle_tasks(&mgr.state);
            }
        }
         
        Event::Suspend => {
            let mut mgr = manager.lock().await;
            mgr.pause(false).await;
            mgr.trigger_pre_suspend(false).await;
            tokio::time::sleep(Duration::from_millis(100)).await;
        }
        
        Event::Resume => {
            let mut mgr = manager.lock().await;
            mgr.resume(false).await;
            wake_idle_tasks(&mgr.state);
        }

        Event::Wake => {
            log_message("System resumed from suspend - resetting state");
            
            let mut mgr = manager.lock().await;
            mgr.resume(false).await;
            mgr.reset().await;
            wake_idle_tasks(&mgr.state);

            // Release lock before spawning
            drop(mgr);
            
            // Restart Waybar if it's running
            tokio::spawn(async {
                tokio::time::sleep(Duration::from_millis(500)).await;
                
                // Check if waybar is running
                match tokio::process::Command::new("pgrep")
                    .arg("-x")  // exact match
                    .arg("waybar")
                    .output()
                    .await
                {
                    Ok(output) if !output.stdout.is_empty() => {
                        // Waybar is running, send restart signal
                        match tokio::process::Command::new("pkill")
                            .args(["-SIGUSR2", "waybar"])
                            .spawn()
                        {
                            Ok(_) => log_message("Sent restart signal to Waybar"),
                            Err(e) => log_message(&format!("Failed to signal Waybar: {}", e)),
                        }
                    }
                    Ok(_) => {
                        // Waybar is not running, skip
                        log_message("Waybar not detected, skipping restart signal");
                    }
                    Err(e) => {
                        log_message(&format!("Failed to check for Waybar process: {}", e));
                    }
                }
            });
        }
                
        Event::LockScreenDetected => {
            let mut mgr = manager.lock().await;
            mgr.advance_past_lock().await;
            wake_idle_tasks(&mgr.state);
        }

        Event::MediaPlaybackActive => {
            let mut mgr = manager.lock().await;
            mgr.pause(false).await;
            wake_idle_tasks(&mgr.state)
        }

        Event::MediaPlaybackEnded => {
            let mut mgr = manager.lock().await;
            mgr.resume(false).await;
            wake_idle_tasks(&mgr.state);
        }

        Event::LidClosed => {
            let mut mgr = manager.lock().await;
            log_message("Lid closed — handling event...");

            // clone the lid_close_action and lock_action before mutably borrowing
            if let Some(cfg) = &mgr.state.cfg {
                let lid_close = cfg.lid_close_action.clone();
                let lock_action_opt = cfg.actions.iter().find(|a| a.kind == IdleAction::LockScreen).cloned();
                let _ = cfg; // release immutable borrow

                match lid_close {
                    LidCloseAction::Suspend => {
                        mgr.trigger_pre_suspend(true).await;
                    }
                    LidCloseAction::LockScreen => {
                        if let Some(lock_action) = lock_action_opt {
                            run_action(&mut mgr, &lock_action).await;
                        }
                    }
                    LidCloseAction::Custom(cmd) => {
                        log_message(&format!("Running custom lid-close command: {}", cmd));
                        // spawn command here if needed
                    }
                    LidCloseAction::Ignore => {
                        log_message("Lid close ignored by config");
                    }
                }
            }
        }

        Event::LidOpened => {
            let mut mgr = manager.lock().await;
            log_message("Lid opened — handling event...");

            if let Some(cfg) = &mgr.state.cfg {
                match &cfg.lid_open_action {
                    LidOpenAction::Wake => {
                        mgr.resume(false).await;
                        mgr.reset().await;
                        wake_idle_tasks(&mgr.state);
                    }
                    LidOpenAction::Custom(cmd) => {
                        log_message(&format!("Running custom lid-open command: {}", cmd));
                        // spawn command here if needed
                    }
                    LidOpenAction::Ignore => {
                        log_message("Lid open ignored by config");
                    }
                }
            }
        }
    }
}
