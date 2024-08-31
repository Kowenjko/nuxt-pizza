import { stripe } from '@/lib/stripe'
import prismadb from '@/lib/prismadb'
import { OrderStatus } from '@prisma/client'
import { Resend } from 'resend'

export default defineEventHandler(async (event) => {
	const runtimeConfig = useRuntimeConfig()
	const resend = new Resend(process.env.RESEND_API_KEY)

	const body = await readRawBody(event)

	if (!body) {
		setResponseStatus(event, 400)
		return { error: 'Missing body' }
	}

	const signature = getHeader(event, 'stripe-signature')

	if (!signature) {
		setResponseStatus(event, 400)
		return { error: 'Missing signature' }
	}

	try {
		const stripeEvent = stripe.webhooks.constructEvent(
			body,
			signature,
			runtimeConfig.stripeWebhookSecret
		)

		if (stripeEvent.type === 'checkout.session.completed') {
			const session = stripeEvent.data.object
			if (session.mode === 'payment' && session.payment_status === 'paid') {
				if (session.payment_intent) {
					const order = await prismadb.order.findFirst({
						where: {
							id: +session.metadata?.order_id!,
						},
					})

					if (order) {
						await prismadb.order.update({
							where: {
								id: order.id,
							},
							data: {
								paymentId: session.payment_intent as string,
								status: OrderStatus.SUCCEEDED,
							},
						})

						const items = (order?.items as any) || []

						const productList = () => {
							let tempList: string = ''
							items.forEach((item: any) => {
								tempList += `<li>${item.productItem.product.name} | (${
									item.productItem.price
								}$ x ${item.quantity} шт.) = ${
									item.productItem.price * item.quantity
								} $</li>`
							})
							return tempList
						}

						const html = `    
							<h1>Спасибо за покупку!</h1>
   					 	<p>Ваш заказ #${order?.id} оплачен.</p>
    
    					<hr />
							<ul>${productList()}</ul>

    					<hr />
												
							<p>Сумма: <b>${order.totalAmount}</b> $ </p>
							`

						await resend.emails.send({
							from: 'onboarding@resend.dev',
							to: 'ortoswt@gmail.com',
							subject: `Nuxt Pizza / Заказ #${order?.id} оплачен!`,
							html,
						})
					}
				}
				return { message: 'Payment successful' }
			}
		}
		return { message: 'OK' }
	} catch (error) {
		setResponseStatus(event, 500)
		return { error: 'Invalid signature' }
	}
})
