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

export async function findOrCreateCart(token: string | undefined) {
	let userCart = await prismadb.cart.findFirst({
		where: {
			OR: [{ token }],
		},
	})

	if (!userCart) {
		userCart = await prismadb.cart.create({
			data: { token },
		})
	}

	return userCart
}

export async function getCartTotalAmount(cartId: number): Promise<number> {
	const userCartAfterUpdate = await prismadb.cart.findFirst({
		where: {
			id: cartId,
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
		orderBy: {
			createdAt: 'desc',
		},
	})

	const totalAmount = userCartAfterUpdate?.items.reduce(
		(acc, item) => acc + calcCartItemTotalAmount(item),
		0
	)

	return totalAmount ?? 0
}
