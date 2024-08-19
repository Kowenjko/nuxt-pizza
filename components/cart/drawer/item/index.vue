<script setup lang="ts">
import type { Ingredient } from '@prisma/client'

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

defineProps<IProps>()
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
				<ButtonCount :value="quantity" />

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
