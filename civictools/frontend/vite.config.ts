import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss(), preact()],
  server: {
    port: 8000,
    proxy: {
      "/api": { target: "http://localhost:8090", changeOrigin: true },
      "/_": { target: "http://localhost:8090", changeOrigin: true },
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
