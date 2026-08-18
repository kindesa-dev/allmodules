import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { mockStudentApi } from './mock/studentApi.mock.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), mockStudentApi()],
})
