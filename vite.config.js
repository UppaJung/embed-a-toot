import { defineConfig } from 'vite'
import packageJson from "./package.json" assert { type: "json" };

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [],
  base: '/embed-a-toot/',
  define: {
    '__VERSION__': `"${packageJson.version}"`,
  }
})