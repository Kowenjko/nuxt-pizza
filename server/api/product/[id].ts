import prismadb from '@/lib/prismadb'

export default defineEventHandler(async (event) => {
	// @ts-ignore
	const id = parseInt(event.context.params.id) as number

	const product = await prismadb.product.findFirst({
		where: {
			id: Number(id),
		},
		include: {
			ingredients: true,
			category: {
				include: {
					products: {
						include: {
							items: true,
						},
					},
				},
			},
			items: true,
		},
	})
	return product ?? null
})
