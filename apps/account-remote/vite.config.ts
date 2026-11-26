import { federation } from '@module-federation/vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: 'account_remote',
      filename: 'remoteEntry.js',
      exposes: {
        './ProfileWidget': './src/components/ProfileWidget.tsx',
      },
      shared: {
        react: { singleton: true, requiredVersion: '^19.0.0' },
        'react-dom': { singleton: true, requiredVersion: '^19.0.0' },
      },
    }),
  ],
  server: {
    port: 5176,
    strictPort: true,
    cors: true,
    hmr: false,
    origin: 'http://localhost:5176',
  },
  preview: {
    port: 5176,
    strictPort: true,
    cors: true,
  },
  build: {
    target: 'chrome89',
  },
});
