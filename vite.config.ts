import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  // Relative asset URLs: the exact same build works on
  // simonhildell.github.io/flowing-forms-studio/ and on a custom domain,
  // so the site can never break because of a base-path mismatch.
  base: "./",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [react()],
  build: {
    // GitHub Pages is configured to serve this repo from the /docs folder.
    outDir: "docs",
    emptyOutDir: true,
    assetsInlineLimit: 0,
  },
});
