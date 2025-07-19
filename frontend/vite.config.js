import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    watch: {
      usePolling: true,
    },
    allowedHosts: ['app', 'localhost', '127.0.0.1'],
  },
  test: {
    environment: 'jsdom',
    globals: true,
    exclude: ['tests_e2e', 'node_modules']
  }
})
