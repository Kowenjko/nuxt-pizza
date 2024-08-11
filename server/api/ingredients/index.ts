import prismadb from '@/lib/prismadb'

export default defineEventHandler(async (event) => {
	const ingredients = await prismadb.ingredient.findMany()

	return ingredients ?? []
})
