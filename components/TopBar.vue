<script setup lang="ts">
import type { Category, Product } from '@prisma/client'

interface Categories extends Category {
	products: Product[]
}

interface IProps {
	categories: Categories[]
}

const props = defineProps<IProps>()

const filterCategories = computed(() =>
	props.categories.filter(
		(category: Categories) => category.products.length > 0
	)
)
</script>
<template>
	<div
		class="sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10"
		v-if="filterCategories && filterCategories.length > 0"
	>
		<Container class="flex items-center justify-between">
			<Categories :categories="filterCategories" />
			<div class="flex items-center">
				<PopUpSort />
			</div>
		</Container>
	</div>
</template>

<style scoped></style>
