import { defineConfig, transformWithOxc } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
import tailwindcss from '@tailwindcss/vite'
import path from "path"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), 
    {
       name: 'treat-js-files-as-jsx',
      enforce: 'pre',
      async transform(code, id) {
        if (!id.match(/src\/.*\.js$/)) return null;
        return await transformWithOxc(code, id, { lang: 'jsx' });
      },
    },
    tailwindcss(),
  ],
 resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'react-dom$': 'react-dom/profiling',
      'scheduler/tracing': 'scheduler/tracing-profiling',
    },
  },
})
