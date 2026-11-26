import { federation } from '@module-federation/vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: 'cart_remote',
      filename: 'remoteEntry.js',
      exposes: {
        './CartDrawer': './src/components/CartDrawer.tsx',
      },
      shared: {
        react: { singleton: true, requiredVersion: '^19.0.0' },
        'react-dom': { singleton: true, requiredVersion: '^19.0.0' },
      },
    }),
  ],
  server: {
    port: 5175,
    strictPort: true,
    cors: true,
    hmr: false,
    origin: 'http://localhost:5175',
  },
  preview: {
    port: 5175,
    strictPort: true,
    cors: true,
  },
  build: {
    target: 'chrome89',
  },
});
