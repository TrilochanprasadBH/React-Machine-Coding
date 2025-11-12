import { defineConfig, searchForWorkspaceRoot } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],

  // ✅ alias so @shared works
  resolve: {
    alias: {
      "@shared": path.resolve(__dirname, "../../shared")
    }
  },

  // ✅ allow reading shared folder + workspace root
  server: {
    fs: {
      allow: [
        searchForWorkspaceRoot(__dirname),
        __dirname,
        path.resolve(__dirname, "../../shared")
      ]
    }
  }
});
