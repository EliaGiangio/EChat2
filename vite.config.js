import dotenv from 'dotenv';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

dotenv.config();

export default defineConfig({
  base: '/EChat2.0/',
  plugins: [react()],
  define: {
    'process.env': process.env
  }
});
