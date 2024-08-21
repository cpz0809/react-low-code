import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { fileURLToPath } from 'url'

const __filenameNew = fileURLToPath(import.meta.url)

const __dirnameNew = path.dirname(__filenameNew)
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
         @import "@/styles/variables.scss"; 
        `
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirnameNew, 'src')
    }
  }
})
