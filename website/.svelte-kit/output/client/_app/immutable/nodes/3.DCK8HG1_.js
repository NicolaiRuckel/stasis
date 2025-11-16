import"../chunks/DsnmJJEf.js";import{d as y,o as k,s as w}from"../chunks/Bj9Rkbkt.js";import{p as _,f as h,b as u,c as S,j as x,k as A,d as o,s as C,r as a,n as I,l as c,t as E}from"../chunks/Dgo8V_i1.js";import{e as D,i as P,s as B}from"../chunks/DJYfaDbW.js";var T=h('<li class="svelte-3ira9l"><button> </button></li>'),R=h(`<div class="page-container svelte-3ira9l"><nav class="links-nav svelte-3ira9l"><div class="nav-title svelte-3ira9l">On this page</div> <ul class="svelte-3ira9l"></ul></nav> <main class="content svelte-3ira9l"><h1 class="svelte-3ira9l">Configuration</h1> <section id="overview" class="svelte-3ira9l"><h2 class="svelte-3ira9l">Overview</h2> <p class="svelte-3ira9l">Stasis uses a <code class="svelte-3ira9l">.rune</code> configuration file located at <code class="svelte-3ira9l">$XDG_CONFIG_HOME/stasis/stasis.rune</code> (typically <code class="svelte-3ira9l">~/.config/stasis/stasis.rune</code>).
        On first run, Stasis automatically generates a default configuration file with sensible defaults.</p> <p class="svelte-3ira9l">The default configuration template is located at <code class="svelte-3ira9l">/etc/stasis/stasis.rune</code>.</p> <p class="svelte-3ira9l">The configuration is structured hierarchically with a main <code class="svelte-3ira9l">stasis:</code> block containing
        all settings, actions, and laptop-specific power profiles.</p></section> <section id="global" class="svelte-3ira9l"><h2 class="svelte-3ira9l">Global Settings</h2> <p class="svelte-3ira9l">At the top of your config, you can define global variables and metadata:</p> <pre class="svelte-3ira9l"><code class="svelte-3ira9l">@author "Your Name"
@description "Stasis configuration file"

# Define global variables for reuse
default_timeout 300  # 5 minutes</code></pre> <p class="svelte-3ira9l">Global variables can be referenced throughout your configuration, making it easier to maintain consistent values.</p></section> <section id="stasis-block" class="svelte-3ira9l"><h2 class="svelte-3ira9l">Stasis Block</h2> <p class="svelte-3ira9l">All configuration lives within the <code class="svelte-3ira9l">stasis:</code> block:</p> <pre class="svelte-3ira9l"><code class="svelte-3ira9l">stasis:
  pre_suspend_command "hyprlock"
  monitor_media true
  ignore_remote_media true
  respect_idle_inhibitors true
  
  # ... action blocks and laptop configs
end</code></pre> <h3 class="svelte-3ira9l">Pre-Suspend Command</h3> <p class="svelte-3ira9l"><code class="svelte-3ira9l">pre_suspend_command</code> runs before the system suspends. Commonly used to lock the screen:</p> <pre class="svelte-3ira9l"><code class="svelte-3ira9l">pre_suspend_command "hyprlock"</code></pre></section> <section id="media" class="svelte-3ira9l"><h2 class="svelte-3ira9l">Media Monitoring</h2> <h3 class="svelte-3ira9l">Media Playback</h3> <p class="svelte-3ira9l">Control whether Stasis monitors media playback to prevent idle actions:</p> <pre class="svelte-3ira9l"><code class="svelte-3ira9l">monitor_media true
ignore_remote_media true</code></pre> <ul class="svelte-3ira9l"><li class="svelte-3ira9l"><code class="svelte-3ira9l">monitor_media</code> - When true, active media playback prevents idle timeouts</li> <li class="svelte-3ira9l"><code class="svelte-3ira9l">ignore_remote_media</code> - Ignores media from remote sources (KDEConnect, Spotify remote play, etc.)</li></ul> <h3 class="svelte-3ira9l">Media Blacklist</h3> <p class="svelte-3ira9l">Ignore specific media players when checking for active playback:</p> <pre class="svelte-3ira9l"><code class="svelte-3ira9l">media_blacklist ["spotify", "rhythmbox"]</code></pre></section> <section id="inhibitors" class="svelte-3ira9l"><h2 class="svelte-3ira9l">Inhibitors</h2> <h3 class="svelte-3ira9l">Idle Inhibitors</h3> <p class="svelte-3ira9l">Respect system-wide idle inhibitors from other applications:</p> <pre class="svelte-3ira9l"><code class="svelte-3ira9l">respect_idle_inhibitors true</code></pre> <h3 class="svelte-3ira9l">Application Inhibitors</h3> <p class="svelte-3ira9l">Specify applications that should prevent idle actions when active.
        Supports exact names and regex patterns:</p> <pre class="svelte-3ira9l"><code class="svelte-3ira9l">inhibit_apps [
  "vlc"
  "Spotify"
  "mpv"
  r".*\\.exe"           # Any .exe (Wine/Proton)
  r"steam_app_.*"      # Steam games
  r"firefox.*"         # Firefox windows
]</code></pre> <div class="info svelte-3ira9l"><strong class="svelte-3ira9l">Regex Pattern Guidelines:</strong> <ul class="svelte-3ira9l"><li class="svelte-3ira9l">Use raw string syntax: <code class="svelte-3ira9l">r"pattern"</code> for all regex patterns</li> <li class="svelte-3ira9l">Escape special characters properly: <code class="svelte-3ira9l">\\.</code> for literal dots, <code class="svelte-3ira9l">\\d+</code> for digits</li> <li class="svelte-3ira9l">Use <code class="svelte-3ira9l">.*</code> for wildcard matching</li> <li class="svelte-3ira9l">Use <code class="svelte-3ira9l">^</code> for start-of-string and <code class="svelte-3ira9l">$</code> for end-of-string anchors</li> <li class="svelte-3ira9l">Test your patterns with verbose logging to ensure they match correctly</li> <li class="svelte-3ira9l"><strong class="svelte-3ira9l">NOTE:</strong> Stasis uses the <code class="svelte-3ira9l">regex</code> crate for pattern matching</li></ul></div></section> <section id="laptop" class="svelte-3ira9l"><h2 class="svelte-3ira9l">Laptop Settings</h2> <h3 class="svelte-3ira9l">Lid Actions</h3> <p class="svelte-3ira9l">Configure what happens when the laptop lid closes or opens:</p> <pre class="svelte-3ira9l"><code class="svelte-3ira9l">lid_close_action "lock-screen"
lid_open_action "wake"</code></pre> <div class="info svelte-3ira9l"><strong class="svelte-3ira9l">Available lid_close_action options:</strong> <ul class="svelte-3ira9l"><li class="svelte-3ira9l"><code class="svelte-3ira9l">lock-screen</code> - Lock the screen</li> <li class="svelte-3ira9l"><code class="svelte-3ira9l">suspend</code> - Suspend the system</li> <li class="svelte-3ira9l"><code class="svelte-3ira9l">custom</code> - Run a custom command</li> <li class="svelte-3ira9l"><code class="svelte-3ira9l">ignore</code> - Do nothing</li></ul></div> <div class="info svelte-3ira9l"><strong class="svelte-3ira9l">Available lid_open_action options:</strong> <ul class="svelte-3ira9l"><li class="svelte-3ira9l"><code class="svelte-3ira9l">wake</code> - Wake the system</li> <li class="svelte-3ira9l"><code class="svelte-3ira9l">custom</code> - Run a custom command</li> <li class="svelte-3ira9l"><code class="svelte-3ira9l">ignore</code> - Do nothing</li></ul></div> <h3 class="svelte-3ira9l">Debounce</h3> <p class="svelte-3ira9l">Prevent rapid lid open/close events from triggering multiple actions.
        Default is 3 seconds:</p> <pre class="svelte-3ira9l"><code class="svelte-3ira9l">debounce_seconds 4</code></pre></section> <section id="actions" class="svelte-3ira9l"><h2 class="svelte-3ira9l">Idle Actions</h2> <p class="svelte-3ira9l">Stasis supports several built-in action types that trigger after periods of inactivity.
        Each action block has three key parameters:</p> <ul class="svelte-3ira9l"><li class="svelte-3ira9l"><code class="svelte-3ira9l">timeout</code> - Seconds of idle time before triggering (required)</li> <li class="svelte-3ira9l"><code class="svelte-3ira9l">command</code> - Command to run when action triggers (required)</li> <li class="svelte-3ira9l"><code class="svelte-3ira9l">resume-command</code> - Command to run when activity resumes (optional)</li></ul> <h3 class="svelte-3ira9l">Built-in Action Types</h3> <ul class="svelte-3ira9l"><li class="svelte-3ira9l"><code class="svelte-3ira9l">lock_screen</code> / <code class="svelte-3ira9l">lock-screen</code> - Lock the session</li> <li class="svelte-3ira9l"><code class="svelte-3ira9l">dpms</code> - Display power management (screen off)</li> <li class="svelte-3ira9l"><code class="svelte-3ira9l">suspend</code> - System suspend</li> <li class="svelte-3ira9l"><code class="svelte-3ira9l">brightness</code> - Adjust screen brightness (laptop only)</li> <li class="svelte-3ira9l"><code class="svelte-3ira9l">custom-*</code> - Custom actions with any name</li></ul></section> <section id="desktop" class="svelte-3ira9l"><h2 class="svelte-3ira9l">Desktop Actions</h2> <p class="svelte-3ira9l">Desktop actions apply to all devices (desktops and laptops when not in AC/battery profiles).
        Define them directly under the <code class="svelte-3ira9l">stasis:</code> block:</p> <pre class="svelte-3ira9l"><code class="svelte-3ira9l">lock_screen:
  timeout 300  # 5 minutes
  command "loginctl lock-session"
  resume-command "notify-send 'Welcome Back $env.USER!'"
end

dpms:
  timeout 60  # 1 minute after lock
  command "niri msg action power-off-monitors"
  resume-command "niri msg action power-on-monitors"
end

suspend:
  timeout 1800  # 30 minutes
  command "systemctl suspend"
  resume-command None
end</code></pre> <div class="warning svelte-3ira9l"><strong class="svelte-3ira9l">🔒 loginctl Integration:</strong> When using <code class="svelte-3ira9l">loginctl lock-session</code> as your lock command, you <b>MUST</b> specify 
        the actual locker via the <code class="svelte-3ira9l">lock-command</code> parameter: <pre class="svelte-3ira9l"><code class="svelte-3ira9l">lock_screen:
  timeout 300
  command "loginctl lock-session"
  lock-command "swaylock"  # REQUIRED when using loginctl
end</code></pre> <p class="svelte-3ira9l">The <code class="svelte-3ira9l">lock-command</code> is <b>required</b> when <code class="svelte-3ira9l">command</code> is set to <code class="svelte-3ira9l">loginctl lock-session</code>. This tells loginctl which locker to use
          when managing the lock state.</p> <p class="svelte-3ira9l"><b>Note:</b> You can lock your session at any time with <code class="svelte-3ira9l">loginctl lock-session</code> even when using Stasis without needing <code class="svelte-3ira9l">lock-command</code> in the config.</p></div></section> <section id="ac-battery" class="svelte-3ira9l"><h2 class="svelte-3ira9l">AC & Battery Profiles</h2> <p class="svelte-3ira9l">Laptops can define separate action profiles for AC power and battery power.
        These override desktop actions when applicable.</p> <h3 class="svelte-3ira9l">AC Power Profile</h3> <p class="svelte-3ira9l">Actions when plugged in:</p> <pre class="svelte-3ira9l"><code class="svelte-3ira9l">on_ac:
  # Instant action (0 second timeout)
  custom-brightness-instant:
    timeout 0
    command "brightnessctl set 100%"
  end
  
  brightness:
    timeout 120  # 2 minutes
    command "brightnessctl set 30%"
  end
  
  dpms:
    timeout 60
    command "niri msg action power-off-monitors"
  end
  
  lock_screen:
    timeout 120
    command "swaylock"
  end
  
  suspend:
    timeout 300
    command "systemctl suspend"
  end
end</code></pre> <h3 class="svelte-3ira9l">Battery Profile</h3> <p class="svelte-3ira9l">More aggressive timeouts to save battery:</p> <pre class="svelte-3ira9l"><code class="svelte-3ira9l">on_battery:
  custom-brightness-instant:
    timeout 0
    command "brightnessctl set 40%"
  end
  
  brightness:
    timeout 60  # 1 minute
    command "brightnessctl set 20%"
  end
  
  dpms:
    timeout 30  # 30 seconds
    command "niri msg action power-off-monitors"
    resume-command "niri msg action power-on-monitors"
  end
  
  lock_screen:
    timeout 120  # 2 minutes
    command "swaylock"
    resume-command "notify-send 'Welcome back $env.USER!'"
  end
  
  suspend:
    timeout 120  # 2 minutes
    command "systemctl suspend"
  end
end</code></pre> <div class="info svelte-3ira9l"><strong class="svelte-3ira9l">💡 Tip:</strong> Define instant actions (timeout 0) first to prevent them 
        from retriggering after longer timeouts complete.</div></section> <section id="example" class="svelte-3ira9l"><h2 class="svelte-3ira9l">Full Example Configuration</h2> <p class="svelte-3ira9l">Here's the complete default configuration shipped with Stasis:</p> <pre class="svelte-3ira9l"><code class="svelte-3ira9l">@author "Dustin Pilgrim"
@description "Stasis configuration file"

# Global variable
default_timeout 300  # 5 minutes

stasis:
  pre_suspend_command "hyprlock"
  monitor_media true
  ignore_remote_media true
  
  # Optional: ignore specific media players
  #media_blacklist ["spotify"]
  
  respect_idle_inhibitors true
  
  # Laptop lid behavior
  #lid_close_action "lock-screen"  # lock-screen | suspend | custom | ignore
  #lid_open_action "wake"          # wake | custom | ignore
  
  # Debounce: default is 3s; can be customized if needed
  #debounce_seconds 4
  
  # Applications that prevent idle when active
  inhibit_apps [
    "vlc"
    "Spotify"
    "mpv"
    r".*\\.exe"
    r"steam_app_.*"
    r"firefox.*"
  ]
  
  # Desktop-only idle actions (applies to all devices)
  lock_screen:
    timeout 300  # 5 minutes
    command "loginctl lock-session"
    resume-command "notify-send 'Welcome Back $env.USER!'"
    lock-command "swaylock"
  end
  
  dpms:
    timeout 60  # 1 minute
    command "niri msg action power-off-monitors"
    resume-command "niri msg action power-on-monitors"
  end
  
  suspend:
    timeout 1800  # 30 minutes
    command "systemctl suspend"
    resume-command None
  end
  
  # Laptop-only AC actions
  on_ac:
    # Instant brightness adjustment
    custom-brightness-instant:
      timeout 0
      command "brightnessctl set 100%"
    end
    
    brightness:
      timeout 120  # 2 minutes
      command "brightnessctl set 30%"
    end
    
    dpms:
      timeout 60  # 1 minute
      command "niri msg action power-off-monitors"
    end
    
    lock_screen:
      timeout 120  # 2 minutes
      command "swaylock"
    end
    
    suspend:
      timeout 300  # 5 minutes
      command "systemctl suspend"
    end
  end
  
  # Laptop-only battery actions
  on_battery:
    custom-brightness-instant:
      timeout 0
      command "brightnessctl set 40%"
    end
    
    brightness:
      timeout 60  # 1 minute
      command "brightnessctl set 20%"
    end
    
    dpms:
      timeout 30  # 30 seconds
      command "niri msg action power-off-monitors"
      resume-command "niri msg action power-on-monitors"
    end
    
    lock_screen:
      timeout 120  # 2 minutes
      command "swaylock"
      resume-command "notify-send 'Welcome back $env.USER!'"
    end
    
    suspend:
      timeout 120  # 2 minutes
      command "systemctl suspend"
    end
  end
end</code></pre></section></main></div>`);function U(g,f){_(f,!0);let d=A("");const m=[{id:"overview",title:"Overview"},{id:"global",title:"Global Settings"},{id:"stasis-block",title:"Stasis Block"},{id:"media",title:"Media Monitoring"},{id:"inhibitors",title:"Inhibitors"},{id:"laptop",title:"Laptop Settings"},{id:"actions",title:"Idle Actions"},{id:"desktop",title:"Desktop Actions"},{id:"ac-battery",title:"AC & Battery"},{id:"example",title:"Full Example"}];k(()=>{const l=window.location.hash.slice(1);if(l){const s=document.getElementById(l);if(s){const e=window.innerWidth<=968?0:70,r=s.getBoundingClientRect().top+window.scrollY-e;window.scrollTo({top:r,behavior:"instant"})}}const t=new IntersectionObserver(s=>{s.forEach(e=>{e.isIntersecting&&x(d,e.target.id,!0)})},{rootMargin:"-100px 0px -80% 0px"});return m.forEach(({id:s})=>{const e=document.getElementById(s);e&&t.observe(e)}),()=>t.disconnect()});function b(l){const t=document.getElementById(l);if(t){const s=window.innerWidth<=968?80:70,i=t.getBoundingClientRect().top+window.scrollY-s;window.scrollTo({top:i,behavior:"smooth"})}}var n=R(),p=o(n),v=C(o(p),2);D(v,21,()=>m,P,(l,t)=>{var s=T(),e=o(s);e.__click=()=>b(c(t).id);let i;var r=o(e,!0);a(e),a(s),E(()=>{i=B(e,1,"svelte-3ira9l",null,i,{active:c(d)===c(t).id}),w(r,c(t).title)}),u(l,s)}),a(v),a(p),I(2),a(n),u(g,n),S()}y(["click"]);export{U as component};
