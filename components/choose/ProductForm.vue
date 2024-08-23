<script setup lang="ts">
interface IProps {
	imageUrl: string
	name: string
	price: number
}

defineProps<IProps>()

const totalPrice = 350
</script>
<template>
	<div class="flex flex-1">
		<ProductImage :image-url="imageUrl" type="product" />
		<div class="w-[490px] bg-[#f7f6f5] p-7">
			<AppTitle :text="name" size="md" class="font-extrabold mb-1" />

			<Button
				@click="$emit('addProductToCart')"
				class="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
			>
				Добавить в корзину за {{ price }} $
			</Button>
		</div>
	</div>
</template>
