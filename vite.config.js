import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
   base: '/task6/',
  plugins: [react()],
  https: true,
  server: {
    proxy: {
      '/api': {
        target: 'https://theapptask5.somee.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
