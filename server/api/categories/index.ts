import prismadb from '@/lib/prismadb'

export default defineEventHandler(async (event) => {
	const categories = await prismadb.category.findMany({
		include: {
			products: {
				include: {
					ingredients: true,
					items: true,
				},
			},
		},
	})

	return categories ?? []
})
