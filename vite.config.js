import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import eslint from "vite-plugin-eslint"

export default defineConfig({
  plugins: [
    vue(),
    eslint()
  ],
  build: {
    rollupOptions: {
      input: {
        popup: "src/popup.js",
        extension: "src/extension.js"
      },
      output: {
        entryFileNames: "assets/[name].js",
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`
      }
    }
  }
})
