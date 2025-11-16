import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build'
    }),

    paths: {
      base: '/stasis'
    },

    prerender: {
      handleHttpError: 'ignore' // optional: silence 404s during prerender
    }
  }
};

export default config;
