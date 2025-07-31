import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	server: {
		host: true,
		port: 5173,
		strictPort: true,
		hmr: {
			port: 5173,
		},
	},
	resolve: {
		alias: [
			{ find: "@", replacement: "/src/" },
			{ find: "@components", replacement: "/src/components" },
			{ find: "@api", replacement: "/src/api" },
			{ find: "@types", replacement: "/src/types" },
			{ find: "@pages", replacement: "/src/pages" },
			{ find: "@service", replacement: "/src/service" },
			{ find: "@helpers", replacement: "/src/helpers" },
			{ find: "@hooks", replacement: "/src/hooks" },
		],
	},
});
