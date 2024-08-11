<script setup lang="ts">
const { data: categories } = await useFetch('/api/categories')

useHead({ title: 'Главная' })
</script>
<template>
	<Container class="mt-10">
		<AppTitle text="Все пиццы" size="lg" class="font-extrabold" />
	</Container>
	<TopBar :categories="categories" />
	<Container class="mt-10 pb-14">
		<div class="flex gap-[80px]">
			<div class="w-[250px]">
				<Filters />
			</div>
			<div class="flex-1">
				<div
					v-if="categories && categories.length > 0"
					class="flex flex-col gap-16"
				>
					<ProductGroupList
						v-for="category in categories"
						:key="category.id"
						:title="category.name"
						:items="category.products"
						:category-id="category.id"
					/>
				</div>
			</div>
		</div>
	</Container>
</template>

<style scoped></style>
