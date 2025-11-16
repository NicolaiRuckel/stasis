import { z as ensure_array_like, F as attr_class } from "../../../chunks/index.js";
import { e as escape_html } from "../../../chunks/context.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let activeSection = "";
    const sections = [{ id: "waybar", title: "Waybar" }];
    $$renderer2.push(`<div class="page-container svelte-1ednst5"><nav class="links-nav svelte-1ednst5"><div class="nav-title svelte-1ednst5">On this page</div> <ul class="svelte-1ednst5"><!--[-->`);
    const each_array = ensure_array_like(sections);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let section = each_array[$$index];
      $$renderer2.push(`<li class="svelte-1ednst5"><button${attr_class("svelte-1ednst5", void 0, { "active": activeSection === section.id })}>${escape_html(section.title)}</button></li>`);
    }
    $$renderer2.push(`<!--]--></ul></nav> <main class="content svelte-1ednst5"><h1 class="svelte-1ednst5">Integration</h1> <section id="waybar" class="svelte-1ednst5"><h2 class="svelte-1ednst5">Waybar</h2> <h3 class="svelte-1ednst5">Example Custom Module</h3> <p class="svelte-1ednst5">To use Stasis with waybar is fairly straightforward. Below is an example custom module for waybar:</p> <h4 class="svelte-1ednst5">Icon-based Display</h4> <pre class="svelte-1ednst5"><code class="svelte-1ednst5">"custom/stasis": {
  "exec": "stasis info --json",
  "format": "{icon}",
  "format-icons": {
      "idle_active": "",
      "idle_inhibited": "",
      "manually_inhibited": "",
      "not_running": "󰒲"
  },
  "tooltip": true,
  "on-click": "stasis toggle-inhibit",
  "interval": 2,
  "restart-interval": 2,
  "return-type": "json"
}</code></pre> <h4 class="svelte-1ednst5">Text-based Display</h4> <p class="svelte-1ednst5">Or you can just display text if you don't want icons:</p> <pre class="svelte-1ednst5"><code class="svelte-1ednst5">"custom/stasis": {
  "exec": "stasis info --json",
  "format": "{text}",
  "tooltip": true,
  "on-click": "stasis toggle-inhibit",
  "interval": 2,
  "restart-interval": 2,
  "return-type": "json"
}</code></pre></section></main></div>`);
  });
}
export {
  _page as default
};
