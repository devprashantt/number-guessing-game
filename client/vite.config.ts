import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

import path from "path";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svgr({
      include: "**/*.svg?react",
    }),
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@constants": path.resolve(__dirname, "src/constants"),
      "@components": path.resolve(__dirname, "src/components"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@store": path.resolve(__dirname, "src/store"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@apis": path.resolve(__dirname, "src/apis"),
      "@toast": path.resolve(__dirname, "src/lib/toast"),
      "@reducers": path.resolve(__dirname, "src/store/reducers"),
      "@icons": path.resolve(__dirname, "src/icons"),
    },
  },
  server: {
    proxy: {
      "/v1": {
        target: "http://localhost:5173",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/v1/, ""),
      },
    },
  },
  build: {
    outDir: path.join(__dirname, "build"),
  },
});
