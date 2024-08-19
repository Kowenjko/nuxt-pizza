<script setup lang="ts">
import { useCartStore } from '@/store'

interface IProps {
	imageUrl: string
	name: string
	price: number
	quantity: number
	id: number
	ingredients?: any[]
	pizzaSize?: number | null
	type?: number | null
}

const props = defineProps<IProps>()

const cartStore = useCartStore()
const plus = async () => {
	await cartStore.updateItemQuantity(props.id, props.quantity + 1)
}
const minus = async () => {
	await cartStore.updateItemQuantity(props.id, props.quantity - 1)
}
</script>
<template>
	<div class="flex bg-white p-5 gap-6">
		<CartDrawerItemImage :src="imageUrl" />
		<div class="flex-1">
			<CartDrawerItemInfo
				:name="name"
				:ingredients="ingredients"
				:pizza-size="pizzaSize"
				:type="type"
			/>
			<hr class="my-3" />
			<div class="flex items-center justify-between">
				<ButtonCount :value="quantity" @plus="plus" @minus="minus" />

				<div class="flex items-center gap-3">
					<CartDrawerItemPrice :value="price" />
					<button>
						<IconTrash2
							class="text-gray-400 cursor-pointer hover:text-red-600 transition-all"
							:size="16"
						/>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
