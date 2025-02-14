import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,  
    allowedHosts: [
      'ec2-34-239-122-225.compute-1.amazonaws.com',
      'localhost',
      '127.0.0.1'
    ]
  },
})
