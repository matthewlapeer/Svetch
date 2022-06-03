import adapter from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({ out: 'dist' }),
		vite: {
			optimizeDeps: {
				include: ["highlight.js", "highlight.js/lib/core"],
			},
			server: {
				fs: {
				// Allow serving files from one level up to the project root
					allow: ['..'],
				},
			},
		}
	}
};

export default config;
