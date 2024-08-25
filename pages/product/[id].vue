<script setup lang="ts">
import type { IProduct } from '@/types/prisma'
import { useCartStore } from '@/store'

const route = useRoute()

const { data: product } = await useFetch<IProduct>(
	// @ts-ignore
	`/api/product/${route.params.id}`
)

if (!product.value)
	showError({
		statusCode: 404,
		// @ts-ignore
		statusMessage: `Нет таково продукта ${route.params.id}`,
	})

const { $toast } = useNuxtApp()
const cartStore = useCartStore()

const firstItems = ref(product.value?.items[0])

const isPizzaForm = computed(() => firstItems.value?.pizzaType)

const filterCategories = computed(() =>
	product.value?.category.products.filter((pr) => pr.id !== product.value?.id)
)

const onAddProduct = async () => {
	try {
		await cartStore.addCartItem({ productItemId: firstItems.value?.id })
		$toast.success('Продукт добавлен в корзину')
		close()
	} catch (error) {
		$toast.error('Произошла ошибка при добавлении в корзину')
		console.log(error)
	}
}

const onAddPizza = async (productItemId: number, ingredients: number[]) => {
	try {
		await cartStore.addCartItem({ productItemId, ingredients })
		$toast.success('Пицца добавлена в корзину')
		close()
	} catch (error) {
		$toast.error('Произошла ошибка при добавлении в корзину')
		console.log(error)
	}
}

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
			:loading="cartStore.loading"
			@addPizzaToCart="onAddPizza"
		/>
		<ChooseProductForm
			v-else
			:image-url="product.imageUrl"
			:name="product.name"
			:price="firstItems?.price"
			:loading="cartStore.loading"
			@addProductToCart="onAddProduct"
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
