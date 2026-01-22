import { defineConfig } from '@/packages/vite-config'

export default defineConfig(async () => {
  return {
    vite: {
      publicDir: 'src/scss-bem',
    },
  }
})
