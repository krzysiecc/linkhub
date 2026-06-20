import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// base: './' -> relative asset paths, so the build works at a domain root
// (Cloudflare Pages with a custom domain) and the /privacy/ page resolves its
// ../assets/... one level deep.
// input paths are relative to the project root (Vite resolves them from there).
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "./",
  build: {
    rollupOptions: {
      // multi-page: main site + /privacy/ (privacy/index.html -> src/privacy)
      input: {
        main: "index.html",
        privacy: "privacy/index.html",
      },
    },
  },
});
