import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:8080'
    },
    historyApiFallback: true
  },
  resolve: {
    alias: {
      'bpmn-js': path.resolve(__dirname, 'node_modules/bpmn-js')
    }
  },
  
  
  assetsInclude: ['**/*.bpmn']
})
