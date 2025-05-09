import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'posts',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App.tsx',
      },
      shared: {
        react: {
          requiredVersion: '19.1.0',
        },
        'react-dom': {
          requiredVersion: '19.1.0',
        },
        'react-router-dom': {
          requiredVersion: '^6.22.2',
        },
      },
    }),
  ],
  envDir: './env',
  server: {
    port: 5001,
    strictPort: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
})
