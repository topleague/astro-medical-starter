import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  vite: {
    build: {
      // Inline CSS cuando el chunk es menor de 100KB — elimina el request bloqueante
      cssCodeSplit: false,
      assetsInlineLimit: 102400, // 100KB
    },
    ssr: {
      noExternal: [],
    }
  },
});
