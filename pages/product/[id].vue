<script setup lang="ts">
import { errorHandler } from '@/server/utils/errorHandler'
import type { Product } from '@prisma/client'

const route = useRoute()

const {
	params: { id },
} = route

const { data: product } = await useFetch<Product>(`/api/product/${id}`)

// if (!product.value) errorHandler(404, 'Такого продукта нет')

// throw createError({
// 	statusCode: 404,
// 	statusMessage: 'Page Not Found',
// 	data: {
// 		myCustomField: true,
// 	},
// })
</script>
<template>
	<Container class="flex flex-col my-10">
		<div class="flex flex-1">
			<ProductImage :imageUrl="product?.imageUrl || ''" :size="40" />
			<div class="w-[490px] bg-[#F7f6f5] p-7">
				<AppTitle :text="product?.name" size="md" class="font-extrabold mb-1" />
				<p class="text-gray-400">
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque
					laboriosam vero voluptate, aperiam neque dolorem et quo numquam dicta
					repudiandae esse! Unde ducimus, eaque harum officiis tempora totam
					dolorum. Rem!
				</p>
				<ProductVariant
					:items="[
						{ name: '20 см', value: '20' },
						{ name: '30 см', value: '30' },
						{ name: '40 см', value: '40', disabled: true },
					]"
					:selectedValue="'30'"
				/>
			</div>
		</div>
	</Container>
</template>

<style scoped></style>
