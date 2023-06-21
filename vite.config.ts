import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
    server: {
        proxy: {
            '/api': 'https://botlist-api.squareweb.app'
        }
    },
    plugins: [react()],
});
