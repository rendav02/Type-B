import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

// Build 2 of 2: the floating window content script, bundled into one IIFE file.
export default defineConfig({
  plugins: [react()],
  resolve: { alias: { '@': resolve(__dirname, 'src') } },
  define: { 'process.env.NODE_ENV': JSON.stringify('production') },
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    target: 'chrome110',
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, 'src/content/index.tsx'),
      name: 'TypeBContent',
      formats: ['iife'],
      fileName: () => 'content.js',
    },
  },
});
