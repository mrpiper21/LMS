import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import dotenv from "dotenv";

dotenv.config();

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	css: {
		postcss: "./postcss.config.js",
	},
	server: {
		proxy: {
			"/pcapi": {
				target: "https://plagiarismcheck.org/api/v1",
				changeOrigin: true,
				secure: true,
				rewrite: (path) => path.replace(/^\/pcapi/, ""),
				headers: {
					"X-API-TOKEN":
						process.env.PLAGIARISM_ORG_API ||
						"36fgKW4-qIn-PS9j1cZw8u6r1I4LEM7S",
				},
			},
		},
	},
	build: {
		target: "es2015", // Better compatibility with older browsers
		rollupOptions: {
			output: {
				manualChunks: {
					vendor: ["react", "react-dom"],
					router: ["react-router-dom"],
				},
			},
		},
	},
});
