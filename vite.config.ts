import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// base: './'  -> wzgledne sciezki, dziala na GitHub Pages (projekt w podkatalogu
// uzytkownik.github.io/<repo>/). Patrz .github/workflows/deploy.yml + public/.nojekyll.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "./",
});
