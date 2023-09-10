import { type UserConfig, defineConfig, loadEnv } from 'vite'
import { join } from 'path'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default ({ mode }): UserConfig => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  return defineConfig({
    plugins: [
      vue()
    ],
    server: {
      proxy: {
        '/api': {
          target: process.env.VITE_API_URL,
          changeOrigin: true
        }
      }
    },
    resolve: {
      alias: {
        '@': join(__dirname, 'src'),
        '@api': join(__dirname, 'src/api'),
        '@components': join(__dirname, 'src/components'),
        '@views': join(__dirname, 'src/views'),
        '@assets': join(__dirname, 'src/assets'),
        '@router': join(__dirname, 'src/router'),
        '@utils': join(__dirname, 'src/utils'),
        '@store': join(__dirname, 'src/store')
      }
    }
  })
}
