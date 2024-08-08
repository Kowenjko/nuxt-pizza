import prismadb from '@/lib/prismadb'

export default defineEventHandler(async (event) => {
	const data = await readBody(event)

	const user = await prismadb.user.create({ data })

	return { user }
})
