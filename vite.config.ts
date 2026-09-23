import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  envDir: path.resolve(import.meta.dirname),
  optimizeDeps: {
    exclude: ["@zoom/meetingsdk"],
  },
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        // Every page lives at pages/<name>/index.tsx, so the default naming
        // gives each route chunk the same "index-<hash>" name. Fall back to the
        // folder name for those so a chunk is identifiable in the network tab.
        chunkFileNames(chunk) {
          const id = chunk.facadeModuleId ?? "";
          const match = id.match(/pages[\/]([^\/]+)[\/]index\.tsx$/);
          const name = match ? match[1] : chunk.name;
          return `assets/${name}-[hash].js`;
        },
      },
    },
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
