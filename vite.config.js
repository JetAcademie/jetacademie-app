import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    port: 80,
    strictPort: true,
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://jetacademie.be',
        changeOrigin: true,
        secure: false,
        ws: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
    port: 80,
    strictPort: true,
    host: true,
    origin: 'http://0.0.0.0:80',
    watch: {
      usePolling: true,
    },
  },
});
