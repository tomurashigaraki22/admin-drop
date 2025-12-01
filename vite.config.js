import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5175,
    host: true, // allows external access
    allowedHosts: ['admin.dropapp.space', 'www.admin.dropapp.space'] // <-- add your domains here
  }
})
