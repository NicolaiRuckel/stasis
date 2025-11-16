import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.CEqRf5iM.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/Dgo8V_i1.js","_app/immutable/chunks/Bj9Rkbkt.js","_app/immutable/chunks/BowOYnJc.js","_app/immutable/chunks/CA3ngxol.js","_app/immutable/chunks/Bw9IUeK2.js","_app/immutable/chunks/BiO8yVC2.js","_app/immutable/chunks/B8oYcxFD.js","_app/immutable/chunks/3nwfxED6.js"];
export const stylesheets = ["_app/immutable/assets/0.BceFbm__.css"];
export const fonts = [];
