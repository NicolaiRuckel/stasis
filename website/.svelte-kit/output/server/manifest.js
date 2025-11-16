export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "stasis/_app",
	assets: new Set(["favicon.png","robots.txt"]),
	mimeTypes: {".png":"image/png",".txt":"text/plain"},
	_: {
		client: {start:"_app/immutable/entry/start.Tw5-lFLA.js",app:"_app/immutable/entry/app.NO82wjb4.js",imports:["_app/immutable/entry/start.Tw5-lFLA.js","_app/immutable/chunks/B8oYcxFD.js","_app/immutable/chunks/Bj9Rkbkt.js","_app/immutable/chunks/Dgo8V_i1.js","_app/immutable/chunks/3nwfxED6.js","_app/immutable/entry/app.NO82wjb4.js","_app/immutable/chunks/Dgo8V_i1.js","_app/immutable/chunks/Bj9Rkbkt.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/BowOYnJc.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		remotes: {
			
		},
		routes: [
			
		],
		prerendered_routes: new Set(["/stasis/","/stasis/configuration","/stasis/contributing","/stasis/faq","/stasis/integration","/stasis/quick-start"]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
