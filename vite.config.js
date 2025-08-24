import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: `@import "${resolve(__dirname, 'src/styles/variables.less')}";`
      }
    }
  },
  server: {
    host: '0.0.0.0',
    allowedHosts: ['0.0.0.0', 'p8c8f9d2.natappfree.cc'],
    port: 5173
  }
})