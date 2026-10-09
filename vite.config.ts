import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// На GitHub Pages проект хостится в /<repo>/, поэтому base задаётся окружением.
// Локально (и для кастомных доменов) — '/'.
export default defineConfig({
  base: process.env.VITE_BASE || '/',
  plugins: [react()],
});
