import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default defineConfig(async () => {
	const baseConfig = await viteConfig({ command: 'build', mode: 'test' }) // simulate a mode
	return mergeConfig(baseConfig, {
		test: {
			environment: 'jsdom',
			exclude: [...configDefaults.exclude, 'e2e/**'],
			root: fileURLToPath(new URL('./', import.meta.url)),
		},
	})
})
