import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: {
        components: resolve(__dirname, 'src/components/index.js'),
        plugins: resolve(__dirname, 'src/plugins/index.js')
      },
      name: '@telecom/ui-kit',
      formats: ['es'],
      fileName: (_, entryName) => `${entryName}.js`
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // Add external deps here
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
  plugins: [vue()]
})
