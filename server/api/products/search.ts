import prismadb from '@/lib/prismadb'

export default defineEventHandler(async (event) => {
	const { query } = getQuery(event)

	const products = await prismadb.product.findMany({
		where: {
			name: {
				// @ts-ignore
				contains: query || '',
				mode: 'insensitive',
			},
		},
		take: 5,
	})

	return products ?? []
})
