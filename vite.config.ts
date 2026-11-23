import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('/node_modules/three/')) return 'vendor-three';
          if (id.includes('/node_modules/@react-three/fiber/')) return 'vendor-r3f';
          if (id.includes('/node_modules/@react-three/drei/')) return 'vendor-drei';
          if (id.includes('/node_modules/react/')) return 'vendor-react';
        },
      },
    },
  },
});
