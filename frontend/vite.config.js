import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: './',
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true
      },
      '/ws': {
        target: 'ws://localhost:4000',
        ws: true,
        configure: (proxy) => {
          proxy.on('error', () => {
            // Silently suppress WebSocket proxy error if backend is stopped
          });
        }
      }
    }
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        login: resolve(__dirname, 'login.html'),
        studio: resolve(__dirname, 'studio.html')
      }
    }
  }
});
