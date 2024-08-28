<script setup lang="ts">
import { useCartStore } from '@/store'

interface IProps {
	id: number
	name: string
	price: number
	imageUrl: string
	ingredients?: any[]
}

const props = defineProps<IProps>()

const { $toast } = useNuxtApp()
const cartStore = useCartStore()

const details: any = []

if (props.ingredients) {
	details.push(...props.ingredients.map((ingredient) => ingredient.name))
}

const onAddProduct = async () => {
	try {
		await cartStore.addCartItem({
			productItemId: props.id,
		})
		$toast.success('Продукт добавлена в корзину')
	} catch (error) {
		$toast.error('Произошла ошибка при добавлении в корзину')
		console.log(error)
	}
}
</script>

<template>
	<div class="group">
		<PlusModalLink
			:to="`/product/${id}`"
			class="flex justify-center p-6 bg-secondary rounded-lg h-[260px]"
		>
			<nuxt-img
				class="group-hover:translate-y-2 transition duration-300"
				:src="imageUrl"
				format="webp"
				:alt="name"
				width="215"
				height="215"
			/>
		</PlusModalLink>
		<PlusModalLink :to="`/product/${id}`"
			><AppTitle :text="name" size="sm" class="mb-1 mt-3 font-bold"
		/></PlusModalLink>
		<p class="text-sm text-gray-400">{{ details.join(', ') }}</p>
		<div class="flex justify-between items-center mt-4">
			<span class="text-[20px]">
				от <b>{{ price }} $</b>
			</span>

			<Button
				@click.self="onAddProduct"
				variant="secondary"
				class="text-base font-bold"
				:class="{
					'w-[131px]': cartStore.loading && cartStore.productId === id,
				}"
				:loading="cartStore.loading && cartStore.productId === id"
			>
				<IconPlus :size="20" class="mr-1" />
				Добавить
			</Button>
		</div>
	</div>
</template>

<style scoped></style>
