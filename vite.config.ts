/// <reference types='vitest' />
import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
	root: __dirname,
	cacheDir: './node_modules/.vite/.',

	server: {
		port: 4200,
		host: 'localhost',
	},

	preview: {
		port: 4300,
		host: 'localhost',
	},

	plugins: [react(), tsconfigPaths()],

	resolve: {
		alias: {
			'~constant': `${path.resolve(__dirname, './src/constant/')}`,
			'~hook': `${path.resolve(__dirname, './src/hook/')}`,
			'~helper': path.resolve(__dirname, './src/helper'),
			'~type': `${path.resolve(__dirname, './src/type')}`,
			'~store': `${path.resolve(__dirname, './src/store')}`,
			'~component': `${path.resolve(__dirname, './src/component')}`,
			'~layout': `${path.resolve(__dirname, './src/layout')}`,
		  },
	},

	// Uncomment this if you are using workers.
	// worker: {
	//  plugins: [ nxViteTsPaths() ],
	// },

	build: {
		outDir: './dist/luke-exchangewalker',
		reportCompressedSize: true,
		commonjsOptions: {
			transformMixedEsModules: true,
		},
	},

	test: {
		globals: true,
		cache: {
			dir: './node_modules/.vitest',
		},
		environment: 'jsdom',
		include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],

		reporters: ['default'],
		coverage: {
			reportsDirectory: './coverage/luke-exchangewalker',
			provider: 'v8',
		},
	},
});
