import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import eslint from "vite-plugin-eslint"
import path from "path"

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@helpers": path.resolve(__dirname, "./src/helpers"),
      "@components": path.resolve(__dirname, "./src/components"),
    },
  },
  plugins: [
    vue(),
    eslint()
  ],
  build: {
    rollupOptions: {
      input: "src/popup.js",
      output: {
        dir: "output_popup",
        inlineDynamicImports: true,
        entryFileNames: "assets/[name].js",
        assetFileNames: "assets/[name].[ext]"
      }
    }
  }
})
