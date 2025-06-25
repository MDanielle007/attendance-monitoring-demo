import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import Components from 'unplugin-vue-components/vite'
import { PrimeVueResolver } from '@primevue/auto-import-resolver'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '')

	return {
		plugins: [
			vue(),
			vueDevTools(),
			VitePWA({
				registerType: 'autoUpdate',
				devOptions: {
					enabled: env.VITE_APP_PWA_DEVOPTION === 'true',
					navigateFallback: undefined,
					suppressWarnings: true,
				},
				manifest: {
					lang: 'en-US',
					short_name: 'ClassTrack',
					name: 'Class Attendance Tracker',
					theme_color: '#000000',
					background_color: '#011425',
					display: 'standalone',
					start_url: '/auth/login',
					icons: [
						{
							src: '/icons/android-icon-192x192.png',
							sizes: '192x192',
							type: 'image/png',
						},
						{
							src: '/icons/android-icon-512x512.png',
							sizes: '512x512',
							type: 'image/png',
						},
					],
				},
			}),
			Components({
				resolvers: [PrimeVueResolver()],
			}),
		],
		resolve: {
			alias: {
				'@': fileURLToPath(new URL('./src', import.meta.url)),
			},
		},
	}
})
