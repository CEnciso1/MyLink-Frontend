import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  plugins: [react()],
  server: {
    port: 3000,
  },
  headers: {
    "Access-Control-Allow-Origin": "http://localhost:3000", // Set to a specific origin or '*' for any origin
  },
}));
