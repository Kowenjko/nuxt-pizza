// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2024-04-03',
	devtools: { enabled: false },
	modules: [
		'@nuxtjs/tailwindcss',
		'shadcn-nuxt',
		'@nuxt/fonts',
		'nuxt-lucide-icons',
		'@nuxt/image',
		'@pinia/nuxt',
	],
	fonts: {
		families: [{ name: 'Nunito', provider: 'google' }],
	},
	shadcn: {
		prefix: '',
		componentDir: './components/ui',
	},
	lucide: {
		namePrefix: 'Icon',
	},
})
