<script setup lang="ts">
import type { IProduct } from '@/types/prisma'

const route = useRoute()

const { data: product } = await useFetch<IProduct>(
	`/api/product/${route.params.id}`
)

if (!product.value)
	showError({
		statusCode: 404,
		statusMessage: `Нет таково продукта ${route.params.id}`,
	})

const isPizzaForm = computed(() => product.value?.items[0]?.pizzaType)

const filterCategories = computed(() =>
	product.value?.category.products.filter((pr) => pr.id !== product.value?.id)
)

definePageMeta({ layout: 'dashboard' })
</script>
<template>
	<Container class="flex flex-col my-10" v-if="product">
		<ChoosePizzaForm
			v-if="isPizzaForm"
			:image-url="product.imageUrl"
			:name="product.name"
			:items="product.items"
			:ingredients="product.ingredients"
		/>
		<ChooseProductForm
			v-else
			:image-url="product.imageUrl"
			:name="product.name"
		/>
		<ProductGroupList
			v-if="filterCategories && filterCategories.length > 0"
			class="mt-20"
			listClass="grid-cols-4"
			title="Рекомендации"
			:items="filterCategories"
			:category-id="product.category.id"
		/>
	</Container>
</template>

<style scoped></style>
