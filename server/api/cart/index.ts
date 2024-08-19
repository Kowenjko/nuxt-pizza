import prismadb from '@/lib/prismadb'

export default defineEventHandler(async (event) => {
	try {
		const cookies = parseCookies(event)

		const token = cookies?.cartToken

		if (!token) return { totalAmount: 0, items: [] }

		const userCart = await prismadb.cart.findFirst({
			where: {
				OR: [
					{
						token,
					},
				],
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

		return userCart || []
	} catch (error) {
		console.log(error)
	}
})
