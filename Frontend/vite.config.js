import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "https://meezantraders.vercel.app"
    }
  },
  optimizeDeps: {
    include: ['jspdf', 'jspdf-autotable'] // 👈 Key fix for Vercel build
  }
})
