import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// GitHub Pages project-site base path.
export default defineConfig({
  // Custom-domain deployment at https://heritageautofinance.in/
  base: '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    dedupe: ['react', 'react-dom', '@react-three/fiber', '@react-three/drei', 'three'],
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
