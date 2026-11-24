import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';

// One HTML file per page, so every page is a real URL on any static host
// (no rewrite rules needed) and each gets its own title and description.
// BASE is set by the GitHub Pages workflow (the site lives at /<repo>/ there).
export default defineConfig({
  base: process.env.BASE ?? '/',
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2020',
    rollupOptions: {
      input: {
        home: 'index.html',
        services: 'services/index.html',
        projects: 'projects/index.html',
        about: 'about/index.html',
        contact: 'contact/index.html',
      },
    },
  },
});
