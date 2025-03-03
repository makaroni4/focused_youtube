import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import eslint from "vite-plugin-eslint"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig(({ mode }) => ({
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
  define: {
    "__BROWSER_PLATFORM__": JSON.stringify(mode)
  },
  build: {
    rollupOptions: {
      input: "src/welcome.js",
      output: {
        dir: "output_welcome",
        inlineDynamicImports: true,
        entryFileNames: "assets/[name].js",
        assetFileNames: "assets/[name].[ext]"
      }
    }
  }
}))
