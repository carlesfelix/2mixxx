import svgrPlugin from 'vite-plugin-svgr'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import postcssPresetEnv from 'postcss-preset-env'
import postcssGlobalData from '@csstools/postcss-global-data'

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
        include: '**/*.svg?react',
        svgrOptions: {
          // ...svgr options (https://react-svgr.com/docs/options/)
        }
      }),
      react()
    ],
    css: {
      devSourcemap: true,
      postcss: {
        plugins: [
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          postcssGlobalData({
            files: ['./src/styles/utils/breakpoints.css']
          }),
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          postcssPresetEnv()
        ]
      }
    }
  }
})
