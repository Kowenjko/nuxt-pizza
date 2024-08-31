import { absoluteUrl } from '@/lib/utils'
import { stripe } from '@/lib/stripe'

export async function createPayment(details: {
	description: string
	orderId: number
	amount: number
}) {
	const settingsUrl = absoluteUrl('/')

	const stripeSession = await stripe.checkout.sessions.create({
		success_url: settingsUrl,
		cancel_url: settingsUrl,
		payment_method_types: ['card'],
		mode: 'payment',
		billing_address_collection: 'auto',
		customer_email: '10@ukr.net',
		line_items: [
			{
				price_data: {
					currency: 'USD',
					unit_amount: details.amount * 100,
					product_data: {
						name: 'Nuxt Pizza',
						description: details.description,
					},
				},
				quantity: 1,
			},
		],
		metadata: {
			order_id: details.orderId,
		},
	})

	if (stripeSession?.url) return { url: stripeSession.url }
	return null
}
