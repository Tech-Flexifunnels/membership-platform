import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    allowedHosts: [
      '5173-ids712jhlsrbef7jltlmc-5dade6e4.manus-asia.computer',
      'localhost',
      '127.0.0.1'
    ]
  }
})
