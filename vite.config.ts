import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// Primary deployment uses the apex custom domain: https://heritageautofinance.in/
export default defineConfig({
  // Apex custom-domain deployment: serve assets from the domain root.
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
