import svgrPlugin from 'vite-plugin-svgr';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import postcssImport from 'postcss-import';
import postcssPresetEnv from 'postcss-preset-env';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    server: {
      port: 3000
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    plugins: [
      svgrPlugin({
        svgrOptions: {
          icon: true
          // ...svgr options (https://react-svgr.com/docs/options/)
        },
      }),
      react()
    ],
    css: {
      devSourcemap: true,
      postcss: {
        plugins: [
          postcssImport(),
          postcssPresetEnv({
            features: {
              'nesting-rules': true
            }
          })
        ]
      }
    }
  };
});
