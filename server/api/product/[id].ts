import prismadb from '@/lib/prismadb'

export default defineEventHandler(async (event) => {
	// @ts-ignore
	const id = parseInt(event.context.params.id) as number

	console.log(id)
	const product = await prismadb.product.findFirst({
		where: { id: id },
	})
	return product ?? null
})
