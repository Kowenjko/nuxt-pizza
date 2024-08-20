import prismadb from '@/lib/prismadb'
import crypto from 'crypto'
import {
	findOrCreateCart,
	updateCartTotalAmount,
	getCartTotalAmount,
} from '@/server/utils'

export default defineEventHandler(async (event) => {
	try {
		let token = parseCookies(event)?.cartToken
		const body = await readBody(event)

		console.log(token)

		if (!token) token = crypto.randomUUID()

		const userCart = await findOrCreateCart(token)

		const findCartItem = await prismadb.cartItem.findFirst({
			where: {
				cartId: userCart.id,
				productItemId: body.productItemId,
				ingredients: { every: { id: { in: body.ingredientsIds } } },
			},
		})

		if (findCartItem) {
			const updatedCartItem = await prismadb.cartItem.update({
				where: {
					id: findCartItem.id,
				},
				data: {
					quantity: findCartItem.quantity + 1,
				},
			})

			const updateUserCart = await updateCartTotalAmount(token)
			setCookie(event, 'cartToken', token)

			return updateUserCart
		}

		await prismadb.cartItem.create({
			data: {
				cartId: userCart.id,
				productItemId: body.productItemId,
				quantity: 1,
				ingredients: {
					connect: body.ingredients?.map((id: number) => ({ id })),
				},
			},
		})

		const updatedCart = await updateCartTotalAmount(token)
		setCookie(event, 'cartToken', token)

		return updatedCart
	} catch (error) {
		console.log(error)
		errorHandler(500, 'Internal Error')
	}
})
