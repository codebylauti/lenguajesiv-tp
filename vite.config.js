import react from '@vitejs/plugin-react'
import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'spa-404-fallback',
      closeBundle() {
        const outDir = resolve(import.meta.dirname, 'dist')
        copyFileSync(resolve(outDir, 'index.html'), resolve(outDir, '404.html'))
      }
    }
  ],
  base: '/lenguajesiv-tp/',
  server: {
    proxy: {
      '/api': {
        target: 'https://app.opencve.io',
        changeOrigin: true,
        secure: true,
        followRedirects: true,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Accept': 'application/json',
        }
      }
    }
  }
})
