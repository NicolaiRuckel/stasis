import { v as head, w as attr, x as stringify, y as bind_props } from "../../chunks/index.js";
import { b as base } from "../../chunks/server.js";
import "@sveltejs/kit/internal/server";
import { e as escape_html } from "../../chunks/context.js";
import "@sveltejs/kit/internal";
import "../../chunks/exports.js";
import "../../chunks/utils.js";
import { p as page } from "../../chunks/index2.js";
function TopBar($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let theme = "auto";
    function getThemeIcon() {
      switch (theme) {
        case "auto":
          return "brightness_auto";
        case "light":
          return "light_mode";
        case "dark":
          return "dark_mode";
      }
    }
    head("yic9pk", $$renderer2, ($$renderer3) => {
      $$renderer3.push(`<link rel="preconnect" href="https://fonts.googleapis.com"/> <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous"/> <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&amp;family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&amp;display=swap" rel="stylesheet"/> <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&amp;family=Space+Grotesk:wght@300..700&amp;display=swap" rel="stylesheet"/>`);
    });
    $$renderer2.push(`<div class="topbar svelte-yic9pk"><div class="brand svelte-yic9pk"><span><a class="title svelte-yic9pk"${attr("href", `${stringify(base)}/`)}>Stasis</a></span></div> <nav class="svelte-yic9pk"><ul class="svelte-yic9pk"><li class="svelte-yic9pk"><a${attr("href", `${stringify(base)}/quick-start`)} class="svelte-yic9pk">Quick Start</a></li> <li class="svelte-yic9pk"><a${attr("href", `${stringify(base)}/configuration`)} class="svelte-yic9pk">Configuration</a></li> <li class="svelte-yic9pk"><a${attr("href", `${stringify(base)}/integration`)} class="svelte-yic9pk">Integration</a></li> <li class="svelte-yic9pk"><a${attr("href", `${stringify(base)}/contributing`)} class="svelte-yic9pk">Contributing</a></li> <li class="svelte-yic9pk"><a${attr("href", `${stringify(base)}/faq`)} class="svelte-yic9pk">FAQ</a></li></ul></nav> <div class="links svelte-yic9pk"><button class="theme-toggle svelte-yic9pk"${attr("aria-label", `Toggle theme: ${stringify(theme)}`)}><span class="material-symbols-outlined svelte-yic9pk">${escape_html(getThemeIcon())}</span></button> <a class="github svelte-yic9pk" href="https://github.com/saltnpepper97/stasis" aria-label="View on GitHub"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" class="svelte-yic9pk"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path></svg></a></div></div>`);
  });
}
function SideBar($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { isOpen = false } = $$props;
    if (isOpen) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<button class="overlay svelte-1y4dzmg" aria-label="Close menu"></button> <nav class="sidebar svelte-1y4dzmg"><div class="sidebar-header svelte-1y4dzmg"><h2 class="svelte-1y4dzmg">Menu</h2> <button class="close-btn svelte-1y4dzmg" aria-label="Close menu"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button></div> <div class="sidebar-content svelte-1y4dzmg"><a${attr("href", `${stringify(base)}/`)} class="svelte-1y4dzmg">Home</a> <a${attr("href", `${stringify(base)}/quick-start`)} class="svelte-1y4dzmg">Quick Start</a> <a${attr("href", `${stringify(base)}/configuration`)} class="svelte-1y4dzmg">Configuration</a> <a${attr("href", `${stringify(base)}/integration`)} class="svelte-1y4dzmg">Integration</a> <a${attr("href", `${stringify(base)}/contributing`)} class="svelte-1y4dzmg">Contributing</a> <a${attr("href", `${stringify(base)}/faq`)} class="svelte-1y4dzmg">FAQ</a></div></nav>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { isOpen });
  });
}
function Footer($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
    $$renderer2.push(`<footer class="footer svelte-jz8lnl"><div class="footer-content svelte-jz8lnl"><div class="footer-section svelte-jz8lnl"><h3 class="footer-title svelte-jz8lnl">Stasis</h3> <p class="footer-description svelte-jz8lnl">A modern Wayland idle manager that knows when to step back.</p> <div class="social-links svelte-jz8lnl"><a href="https://github.com/saltnpepper97/stasis" target="_blank" rel="noopener noreferrer" aria-label="GitHub" class="svelte-jz8lnl"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path></svg></a> <a href="https://discord.gg/Qjsd8MjP" target="_blank" rel="noopener noreferrer" aria-label="Discord" class="svelte-jz8lnl"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"></path></svg></a></div></div> <div class="footer-section svelte-jz8lnl"><h4 class="svelte-jz8lnl">Documentation</h4> <ul class="svelte-jz8lnl"><li class="svelte-jz8lnl"><a href="/quick-start" class="svelte-jz8lnl">Quick Start</a></li> <li class="svelte-jz8lnl"><a href="/configuration" class="svelte-jz8lnl">Configuration</a></li> <li class="svelte-jz8lnl"><a href="/integration" class="svelte-jz8lnl">Integration</a></li> <li class="svelte-jz8lnl"><a href="/faq" class="svelte-jz8lnl">FAQ</a></li></ul></div> <div class="footer-section svelte-jz8lnl"><h4 class="svelte-jz8lnl">Community</h4> <ul class="svelte-jz8lnl"><li class="svelte-jz8lnl"><a href="https://github.com/saltnpepper97/stasis" target="_blank" rel="noopener noreferrer" class="svelte-jz8lnl">GitHub</a></li> <li class="svelte-jz8lnl"><a href="https://github.com/saltnpepper97/stasis/issues" target="_blank" rel="noopener noreferrer" class="svelte-jz8lnl">Report Issues</a></li> <li class="svelte-jz8lnl"><a href="/contributing" class="svelte-jz8lnl">Contributing</a></li> <li class="svelte-jz8lnl"><a href="https://discord.gg/your-invite" target="_blank" rel="noopener noreferrer" class="svelte-jz8lnl">Discord Server</a></li></ul></div> <div class="footer-section svelte-jz8lnl"><h4 class="svelte-jz8lnl">Resources</h4> <ul class="svelte-jz8lnl"><li class="svelte-jz8lnl"><a href="https://github.com/saltnpepper97/stasis/releases" target="_blank" rel="noopener noreferrer" class="svelte-jz8lnl">Releases</a></li> <li class="svelte-jz8lnl"><a href="https://aur.archlinux.org/packages/stasis" target="_blank" rel="noopener noreferrer" class="svelte-jz8lnl">AUR Package</a></li> <li class="svelte-jz8lnl"><a href="https://github.com/saltnpepper97/stasis/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" class="svelte-jz8lnl">License</a></li></ul></div></div> <div class="footer-bottom svelte-jz8lnl"><p class="svelte-jz8lnl">© ${escape_html(currentYear)} Stasis. Released under the MIT License.</p> <p class="made-with svelte-jz8lnl">Made with 💜 for the Wayland community</p></div></footer>`);
  });
}
function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { children } = $$props;
    let isSidebarOpen = false;
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      head("12qhfyh", $$renderer3, ($$renderer4) => {
        $$renderer4.push(`<link rel="icon" type="image/png" sizes="32x32"${attr("href", `${stringify(base)}/favicon.png`)}/>`);
      });
      $$renderer3.push(`<div class="layout svelte-12qhfyh"><button class="hamburger svelte-12qhfyh" aria-label="Open menu"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg></button> `);
      SideBar($$renderer3, {
        get isOpen() {
          return isSidebarOpen;
        },
        set isOpen($$value) {
          isSidebarOpen = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----> `);
      TopBar($$renderer3);
      $$renderer3.push(`<!----> <div class="inner svelte-12qhfyh">`);
      if (page.route.id === "/") {
        $$renderer3.push("<!--[-->");
        children($$renderer3);
        $$renderer3.push(`<!---->`);
      } else {
        $$renderer3.push("<!--[!-->");
        $$renderer3.push(`<div class="content svelte-12qhfyh">`);
        children($$renderer3);
        $$renderer3.push(`<!----></div>`);
      }
      $$renderer3.push(`<!--]--></div> `);
      Footer($$renderer3);
      $$renderer3.push(`<!----></div>`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
  });
}
export {
  _layout as default
};
