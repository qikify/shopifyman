import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';
import path from 'path';

export default defineConfig({
  plugins: [
    vue(),
    svgLoader(),
  ],
  define: {
    'process.env': {},
  },
  resolve: {
    alias: {
      '~':  path.resolve(__dirname, './node_modules'),
      '@': path.resolve(__dirname, './src'),
      '@icons': path.resolve(__dirname, './node_modules/@shopify/polaris-icons/dist/svg'),
    },
  },
  server: {
    // https://github.com/vitejs/vite/issues/4259
    hmr: {
      protocol: 'ws',
      host: 'localhost',
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    }
  },
  build: {
    cssCodeSplit: true,
    lib: {
      entry: path.resolve(__dirname, 'src/main.ts'),
      name: 'Scaffolding portal',
      fileName: () => 'portal.js',
      formats: ['umd'],
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
})


