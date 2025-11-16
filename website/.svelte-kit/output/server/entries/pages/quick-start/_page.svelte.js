import { z as ensure_array_like, F as attr_class } from "../../../chunks/index.js";
import { e as escape_html } from "../../../chunks/context.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let activeSection = "";
    const sections = [
      { id: "prerequisites", title: "Prerequisites" },
      { id: "input-group", title: "Input Group Setup" },
      { id: "manual", title: "Running Manually" },
      { id: "systemd", title: "Systemd Service" }
    ];
    $$renderer2.push(`<div class="page-container svelte-1426b4x"><nav class="links-nav svelte-1426b4x"><div class="nav-title svelte-1426b4x">On this page</div> <ul class="svelte-1426b4x"><!--[-->`);
    const each_array = ensure_array_like(sections);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let section = each_array[$$index];
      $$renderer2.push(`<li class="svelte-1426b4x"><button${attr_class("svelte-1426b4x", void 0, { "active": activeSection === section.id })}>${escape_html(section.title)}</button></li>`);
    }
    $$renderer2.push(`<!--]--></ul></nav> <main class="content svelte-1426b4x"><h1 class="svelte-1426b4x">Quick Start</h1> <section id="prerequisites" class="svelte-1426b4x"><h2 class="svelte-1426b4x">Prerequisites</h2> <div class="warning svelte-1426b4x"><strong>⚠️ Important:</strong> Before running Stasis, you must be part of the <code class="svelte-1426b4x">input</code> group.</div></section> <section id="input-group" class="svelte-1426b4x"><h2 class="svelte-1426b4x">Input Group Setup</h2> <p class="svelte-1426b4x">Check if you're already in the input group:</p> <pre class="svelte-1426b4x"><code class="svelte-1426b4x">groups $USER</code></pre> <p class="svelte-1426b4x">You should see output like:</p> <pre class="svelte-1426b4x"><code class="svelte-1426b4x">dustin : dustin wheel audio input storage video</code></pre> <p class="svelte-1426b4x">If <code class="svelte-1426b4x">input</code> is missing, add yourself to the group:</p> <pre class="svelte-1426b4x"><code class="svelte-1426b4x">sudo usermod -aG input $USER</code></pre> <p class="note svelte-1426b4x"><strong>Note:</strong> You'll need to log out and back in or restart your computer for group changes to take effect.</p> <p class="note svelte-1426b4x"><strong>Note:</strong> On first run, Stasis automatically generates a configuration file at <code class="svelte-1426b4x">$XDG_CONFIG_HOME/stasis/stasis.rune</code> (typically <code class="svelte-1426b4x">~/.config/stasis/stasis.rune</code>).</p></section> <section id="manual" class="svelte-1426b4x"><h2 class="svelte-1426b4x">Running Manually</h2> <p class="svelte-1426b4x">Stasis must be started from within a running Wayland session. 
        Simply run:</p> <pre class="svelte-1426b4x"><code class="svelte-1426b4x">stasis</code></pre> <p class="svelte-1426b4x">This is useful for testing, but for daily use we recommend setting up 
        the systemd service below.</p></section> <section id="systemd" class="svelte-1426b4x"><h2 class="svelte-1426b4x">Systemd Service (Recommended)</h2> <p class="svelte-1426b4x">For automatic startup, create a systemd user service at <code class="svelte-1426b4x">~/.config/systemd/user/stasis.service</code>:</p> <pre class="svelte-1426b4x"><code class="svelte-1426b4x">[Unit]
Description=Stasis Wayland Idle Manager
After=graphical-session.target
Wants=graphical-session.target

[Service]
Type=simple
ExecStart=%h/.local/bin/stasis
Restart=always
RestartSec=5
Environment=WAYLAND_DISPLAY=wayland-0
# Optional: wait until WAYLAND_DISPLAY exists
ExecStartPre=/bin/sh -c 'while [ ! -e /run/user/%U/wayland-0 ]; do sleep 0.1; done'

[Install]
WantedBy=default.target</code></pre> <p class="svelte-1426b4x">Enable and start the service:</p> <pre class="svelte-1426b4x"><code class="svelte-1426b4x">systemctl --user enable stasis.service
systemctl --user start stasis.service</code></pre> <p class="svelte-1426b4x">Check the service status:</p> <pre class="svelte-1426b4x"><code class="svelte-1426b4x">systemctl --user status stasis.service</code></pre></section></main></div>`);
  });
}
export {
  _page as default
};
