import prismadb from '@/lib/prismadb'
import { OrderStatus, Prisma, UserRole } from '@prisma/client'

import { Resend } from 'resend'

export default defineEventHandler(async (event) => {
	try {
		let token = parseCookies(event)?.cartToken
		const body = await readBody(event)

		const resend = new Resend(process.env.RESEND_API_KEY)

		console.log(process.env.RESEND_API_KEY)

		const userCart = await prismadb.cart.findFirst({
			include: {
				user: true,
				items: {
					include: {
						ingredients: true,
						productItem: {
							include: {
								product: true,
							},
						},
					},
				},
			},
			where: { OR: [{ token }] },
		})

		if (!userCart) {
			return errorHandler(500, 'Cart not found')
		}

		if (userCart?.totalAmount === 0) {
			return errorHandler(500, 'Cart is empty')
		}

		/**
		 * create order
		 */

		const order = await prismadb.order.create({
			data: {
				userId: 1,
				token,
				totalAmount: body.totalAmount,
				status: OrderStatus.PENDING,
				items: [],
				fullName: body.firstName + ' ' + body.lastName,
				email: body.email,
				phone: body.phone,
				address: body.address,
				comment: body.comment,
			},
		})

		/**
		 * clear cart
		 */

		await prismadb.cart.update({
			where: {
				id: userCart.id,
			},
			data: {
				totalAmount: 0,
			},
		})

		await prismadb.cartItem.deleteMany({
			where: {
				cartId: userCart.id,
			},
		})

		/**
		 * create pay
		 */

		const html = `
      <h1>Заказ #${order?.id}</h1>

			// <p>Оплатите заказ на сумму <b>${order?.totalAmount} $</b>. Перейдите <a href="https://vuejs.org/guide/components/slots.html#slot-content-and-outlet">по ссылке</a> для оплаты заказа.</p>
			`

		const data = await resend.emails.send({
			from: 'onboarding@resend.dev',
			to: 'ortoswt@gmail.com',
			subject: `Next Pizza / Оплатите заказ #${order?.id}`,
			html,
		})

		return 'https://vuejs.org/guide/components/slots.html#slot-content-and-outlet'
	} catch (error) {
		console.log(error)
		errorHandler(500, 'Internal Error')
	}
})
