import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      "Access-Control-Allow-Origin": "https://mylink-frontend.onrender.com", // Set to a specific origin or '*' for any origin
    },
  },
});
