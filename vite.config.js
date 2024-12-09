import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/BioPulse_Web/',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  server: {
    fs: {
      allow: ['..'],
    },
    headers: {
      'Content-Type': 'application/javascript',
    },
  },
  optimizeDeps: {
    include: ['slick-carousel'],
  },
});
