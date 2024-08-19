import { calcCartItemTotalAmount } from '@/helpers'
import { errorHandler } from '@/server/utils'
import prismadb from '@/lib/prismadb'

export async function updateCartTotalAmount(token: string) {
	const userCart = await prismadb.cart.findFirst({
		where: {
			OR: [{ token }],
		},
		include: {
			items: {
				orderBy: {
					createdAt: 'desc',
				},
				include: {
					productItem: {
						include: {
							product: true,
						},
					},
					ingredients: true,
				},
			},
		},
	})

	if (!userCart) return errorHandler(500, 'not cart')

	const totalAmount = userCart?.items.reduce((acc, item) => {
		return acc + calcCartItemTotalAmount(item)
	}, 0)

	return await prismadb.cart.update({
		where: { id: userCart?.id },
		data: { totalAmount },
		include: {
			items: {
				orderBy: {
					createdAt: 'desc',
				},
				include: {
					productItem: {
						include: {
							product: true,
						},
					},
					ingredients: true,
				},
			},
		},
	})
}
