import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// Keep React Three Fiber and Drei in Vite's normal dependency graph.
// Splitting these tightly-coupled packages into separate manual chunks can
// create multiple runtime contexts and trigger "Hooks can only be used
// within the Canvas component" on production builds.
export default defineConfig({
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
