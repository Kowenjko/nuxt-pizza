import prismadb from '@/lib/prismadb'

export default defineEventHandler(async (event) => {
	const data = await readBody(event)

	if (!data.email) errorHandler(400, 'Email are required')

	const user = await prismadb.user.create({ data })

	return { user }
})
