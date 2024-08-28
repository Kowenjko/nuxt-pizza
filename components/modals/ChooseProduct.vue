<script setup lang="ts">
import type { IProduct } from '@/types/prisma'

import { useCartStore } from '@/store'

const props = defineProps<{ product: IProduct }>()

const isOpen = ref(true)
const firstItems = ref(props.product.items[0])

const { $modalRouter, $toast } = useNuxtApp()
const cartStore = useCartStore()

const close = () => {
	isOpen.value = false
	// @ts-ignore
	$modalRouter.close()
}

const isPizzaForm = computed(() => firstItems.value.pizzaType)

const onAddProduct = async (productItemId: number, ingredients: number[]) => {
	try {
		await cartStore.addCartItem({
			productItemId: productItemId || firstItems.value.id,
			ingredients: ingredients || [],
		})
		$toast.success('Продукт добавлена в корзину')
		close()
	} catch (error) {
		$toast.error('Произошла ошибка при добавлении в корзину')
		console.log(error)
	}
}
</script>
<template>
	<Dialog :open="true" @update:open="close">
		<DialogContent
			class="p-0 w-[1060px] max-w-[1060px] min-h-[520px] bg-white overflow-hidden"
		>
			<DialogTitle v-show="false"> </DialogTitle>
			<DialogDescription v-show="false"> </DialogDescription>

			<ChoosePizzaForm
				v-if="isPizzaForm"
				:image-url="product.imageUrl"
				:name="product.name"
				:items="product.items"
				:ingredients="product.ingredients"
				:loading="cartStore.loading"
				@addPizzaToCart="onAddProduct"
			/>
			<ChooseProductForm
				v-else
				:image-url="product.imageUrl"
				:name="product.name"
				:price="firstItems?.price"
				:loading="cartStore.loading"
				@addProductToCart="onAddProduct"
			/>
		</DialogContent>
	</Dialog>
</template>

<style scoped></style>
