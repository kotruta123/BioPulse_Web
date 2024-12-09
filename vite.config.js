import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/BioPulse_Web/', // Adjust your base path for deployment if necessary
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'], // Include extensions
  },
  server: {
    headers: {
      'Content-Type': 'application/javascript',
    },
    fs: {
      allow: ['..'],
    },
  },
  optimizeDeps: {
    include: ['slick-carousel'],
  },
});