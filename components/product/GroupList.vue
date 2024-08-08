<script setup lang="ts">
interface IProps {
	title: string
	items: any
	listClass?: string
	categoryId?: number
}

const props = defineProps<IProps>()

const filterProducts = computed(() =>
	props.items?.filter((product: any) => product.items.length > 0)
)
</script>
<template>
	<div class="font-extrabold mb-5" :id="title">
		<AppTitle :text="title" size="lg" class="font-extrabold mb-5" />
		<div class="grid grid-cols-3 gap-[50px]" :class="listClass">
			<ProductCart
				v-for="product in filterProducts"
				:key="product.id"
				:id="product.id"
				:name="product.name"
				:price="product.items[0].price"
				:image-url="product.imageUrl"
			/>
		</div>
	</div>
</template>

<style scoped></style>
