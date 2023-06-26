import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
    server: {
        // host: '0.0.0.0',
        // port: 80,
        proxy: {
            "/api": {
                target: "http://localhost:80",
                changeOrigin: true,
                secure: false,
                ws: true,
            },
        },
    },
    plugins: [react()],
});
