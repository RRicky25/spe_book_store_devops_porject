import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,          // Ensure this matches the container port exposed in Kubernetes
    host: '0.0.0.0',     // Bind to all network interfaces (important for containerized environments)
    strictPort: true,    // Prevent Vite from changing the port if 5173 is taken
    open: true           // Automatically open in browser when running
  },
})
