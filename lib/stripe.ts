import Stripe from 'stripe'

export const stripe = new Stripe(useRuntimeConfig().stripeApiKey!, {
	// apiVersion: '2024-08-26',
	typescript: true,
})
