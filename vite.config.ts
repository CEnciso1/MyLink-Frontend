import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import cors_proxy from "cors-anywhere";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  plugins: [react()],
  server: {
    port: 3000,
  },
}));
