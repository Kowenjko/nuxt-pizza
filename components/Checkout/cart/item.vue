<script setup lang="ts">
import { useCartStore } from '@/store'

const props = defineProps<{
	id: number
	name: string
	price: number
	imageUrl: string
	quantity: number
	ingredients?: any[]
	pizzaSize?: number | null
	type?: number | null
	disabled?: boolean
}>()

const cartStore = useCartStore()

const plus = async () => {
	await cartStore.updateItemQuantity(props.id, props.quantity + 1)
}
const minus = async () => {
	await cartStore.updateItemQuantity(props.id, props.quantity - 1)
}

const deletePizza = async () => {
	await cartStore.removeCartItem(props.id)
}
</script>
<template>
	<div
		class="flex items-center justify-between"
		:class="{ 'opacity-50 pointer-events-none': disabled }"
	>
		<div class="flex items-center gap-5 flex-1">
			<CartDrawerItemImage :src="imageUrl" />
			<CartDrawerItemInfo
				class=""
				:name="name"
				:ingredients="ingredients"
				:pizza-size="pizzaSize"
				:type="type"
			/>
		</div>
		<CartDrawerItemPrice :value="price" />
		<div class="flex items-center gap-5 ml-20">
			<ButtonCount :value="quantity" @plus="plus" @minus="minus" />
			<button @click="deletePizza">
				<IconX
					class="text-gray-400 cursor-pointer hover:text-gray-600"
					:size="20"
				/>
			</button>
		</div>
	</div>
</template>
