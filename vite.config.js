import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: './index.html',
        list: './list.html',
        new: './new.html',
      },
    },
  },
  define: {
    global: {},
  },
});
