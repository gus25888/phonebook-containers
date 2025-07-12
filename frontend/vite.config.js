import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:3001',
    //     changeOrigin: true,
    //   }
    // },
    host: true, // escucha en 0.0.0.0 (para funcionar en Docker)
    watch: {
      usePolling: true, // detecta cambios con volúmenes
    },
    allowedHosts: ['app', 'localhost', '127.0.0.1'],
  }
})
