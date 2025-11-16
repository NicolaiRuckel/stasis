import"../chunks/DsnmJJEf.js";import{d as E,o as B,s as C}from"../chunks/Bj9Rkbkt.js";import{p as T,f as x,d as n,b as g,c as M,s as i,j as O,k as P,r as s,l as r,t as S}from"../chunks/Dgo8V_i1.js";import{e as D,i as H,s as W}from"../chunks/DJYfaDbW.js";var R=x('<li class="svelte-1ednst5"><button> </button></li>'),Y=x(`<div class="page-container svelte-1ednst5"><nav class="links-nav svelte-1ednst5"><div class="nav-title svelte-1ednst5">On this page</div> <ul class="svelte-1ednst5"></ul></nav> <main class="content svelte-1ednst5"><h1 class="svelte-1ednst5">Integration</h1> <section id="waybar" class="svelte-1ednst5"><h2 class="svelte-1ednst5">Waybar</h2> <h3 class="svelte-1ednst5">Example Custom Module</h3> <p class="svelte-1ednst5">To use Stasis with waybar is fairly straightforward. Below is an example custom module for waybar:</p> <h4 class="svelte-1ednst5">Icon-based Display</h4> <pre class="svelte-1ednst5"><code class="svelte-1ednst5"></code></pre> <h4 class="svelte-1ednst5">Text-based Display</h4> <p class="svelte-1ednst5">Or you can just display text if you don't want icons:</p> <pre class="svelte-1ednst5"><code class="svelte-1ednst5"></code></pre></section></main></div>`);function G(y,_){T(_,!0);let p=P("");const m=[{id:"waybar",title:"Waybar"}];B(()=>{const a=new IntersectionObserver(t=>{t.forEach(e=>{e.isIntersecting&&O(p,e.target.id,!0)})},{rootMargin:"-100px 0px -80% 0px"});return m.forEach(({id:t})=>{const e=document.getElementById(t);e&&a.observe(e)}),()=>a.disconnect()});function w(a){const t=document.getElementById(a);if(t){const l=t.getBoundingClientRect().top+window.scrollY-70;window.scrollTo({top:l,behavior:"smooth"})}}var c=Y(),d=n(c),u=i(n(d),2);D(u,21,()=>m,H,(a,t)=>{var e=R(),o=n(e);o.__click=()=>w(r(t).id);let l;var I=n(o,!0);s(o),s(e),S(()=>{l=W(o,1,"svelte-1ednst5",null,l,{active:r(p)===r(t).id}),C(I,r(t).title)}),g(a,e)}),s(u),s(d);var h=i(d,2),f=i(n(h),2),v=i(n(f),8),j=n(v);j.textContent=`"custom/stasis": {
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
}`,s(v);var b=i(v,6),k=n(b);k.textContent=`"custom/stasis": {
  "exec": "stasis info --json",
  "format": "{text}",
  "tooltip": true,
  "on-click": "stasis toggle-inhibit",
  "interval": 2,
  "restart-interval": 2,
  "return-type": "json"
}`,s(b),s(f),s(h),s(c),g(y,c),M()}E(["click"]);export{G as component};
