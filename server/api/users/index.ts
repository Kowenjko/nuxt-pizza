import prismadb from '@/lib/prismadb'

export default defineEventHandler(async (event) => {
	const users = await prismadb.user.findMany()

	return users ?? []
})
