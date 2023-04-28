import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue()
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
        assetFileNames: `assets/[name].[ext]`,
      }
    }
  },
})
