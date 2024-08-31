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
		'nuxt-pages-plus',
		'nuxt-typed-router',
	],
	build: {
		transpile: ['vue-sonner'],
	},
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
	runtimeConfig: {
		stripeApiKey: process.env.STRIPE_API_KEY,
		stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
		publicAppUrl: process.env.PUBLIC_APP_URL,
	},
})
