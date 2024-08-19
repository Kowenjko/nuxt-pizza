import prismadb from '@/lib/prismadb'
import { errorHandler, updateCartTotalAmount } from '@/server/utils'

export default defineEventHandler(async (event) => {
	// @ts-ignore
	const id = parseInt(event.context.params.id) as number
	const token = parseCookies(event)?.cartToken

	if (!token) errorHandler(500, 'cart token not found')

	const cartItem = await prismadb.cartItem.findFirst({ where: { id } })

	if (!cartItem) return errorHandler(500, 'Cart item not found')

	await prismadb.cartItem.delete({ where: { id: cartItem.id } })

	const updateUserCart = await updateCartTotalAmount(token)
	if (updateUserCart) return updateUserCart
	errorHandler(500, 'Internal Error')
})
