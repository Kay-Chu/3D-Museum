import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import postcss from 'postcss';
import nesting from 'postcss-nesting';

export default defineConfig({
  publicDir: 'public',
  plugins: [
    react(),
    {
      ...postcss(),
      plugins: [nesting()],
    },
  ],
});
