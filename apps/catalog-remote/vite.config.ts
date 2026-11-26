import { federation } from '@module-federation/vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: 'catalog_remote',
      filename: 'remoteEntry.js',
      exposes: {
        './ProductGrid': './src/components/ProductGrid.tsx',
        './ProductFilters': './src/components/ProductFilters.tsx',
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: '^19.0.0',
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '^19.0.0',
        },
      },
    }),
  ],
  server: {
    port: 5174,
    strictPort: true,
    cors: true,
    hmr: false,
    origin: 'http://localhost:5174',
  },
  preview: {
    port: 5174,
    strictPort: true,
    cors: true,
  },
  build: {
    target: 'chrome89',
  },
});
