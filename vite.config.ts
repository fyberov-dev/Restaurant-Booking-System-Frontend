import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const proxyTarget = process.env.PROXY_TARGET ?? "http://localhost:8080";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
        port: 3000,
        strictPort: true,
        host: true,
        proxy: {
            "/api": {
                target: proxyTarget,
                changeOrigin: true,
            },
        },
    },
});
