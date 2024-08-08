<script setup lang="ts">
useHead({ title: 'Главная' })

const products = [
	{
		id: 1,
		name: 'Пицца',
		imageUrl:
			'https://pizzahouse.ua/_next/image?url=https%3A%2F%2Fpizzahouse.ua%2Fmedia%2F3622%2Fconversions%2F%D0%9A%D0%B0%D0%BB%D1%8C%D1%86%D0%BE%D0%BD%D0%B5-%D0%B7-%D1%8F%D0%B9%D1%86%D0%B5%D0%BC-large-removebg-preview-medium.webp&w=1920&q=100',
		items: [{ price: 550 }],
	},
	{
		id: 2,
		name: 'Пицца 2',
		imageUrl:
			'https://pizzahouse.ua/_next/image?url=https%3A%2F%2Fpizzahouse.ua%2Fmedia%2F5096%2Fconversions%2F%D1%84%D1%96%D0%BB%D0%B0-%D0%B0%D0%B2%D0%BE%D0%BA%D0%B0%D0%B4%D0%BE-(1)-medium.png&w=1920&q=100',
		items: [{ price: 320 }],
	},
	{
		id: 3,
		name: 'Пицца 2',
		imageUrl:
			'https://pizzahouse.ua/_next/image?url=https%3A%2F%2Fpizzahouse.ua%2Fmedia%2F5096%2Fconversions%2F%D1%84%D1%96%D0%BB%D0%B0-%D0%B0%D0%B2%D0%BE%D0%BA%D0%B0%D0%B4%D0%BE-(1)-medium.png&w=1920&q=100',
		items: [{ price: 320 }],
	},
	{
		id: 4,
		name: 'Пицца 2',
		imageUrl:
			'https://pizzahouse.ua/_next/image?url=https%3A%2F%2Fpizzahouse.ua%2Fmedia%2F5096%2Fconversions%2F%D1%84%D1%96%D0%BB%D0%B0-%D0%B0%D0%B2%D0%BE%D0%BA%D0%B0%D0%B4%D0%BE-(1)-medium.png&w=1920&q=100',
		items: [{ price: 320 }],
	},
	{
		id: 5,
		name: 'Пицца 2',
		imageUrl:
			'https://pizzahouse.ua/_next/image?url=https%3A%2F%2Fpizzahouse.ua%2Fmedia%2F5096%2Fconversions%2F%D1%84%D1%96%D0%BB%D0%B0-%D0%B0%D0%B2%D0%BE%D0%BA%D0%B0%D0%B4%D0%BE-(1)-medium.png&w=1920&q=100',
		items: [{ price: 320 }],
	},
]
</script>
<template>
	<Container class="mt-10">
		<AppTitle text="Все пиццы" size="lg" class="font-extrabold" />
	</Container>
	<TopBar />
	<Container class="mt-10 pb-14">
		<div class="flex gap-[80px]">
			<div class="w-[250px]">
				<Filters />
			</div>
			<div class="flex-1">
				<div class="flex flex-col gap-16">
					<ProductGroupList title="Пиццы" :items="products" :category-id="1" />
					<ProductGroupList
						title="Завтрак"
						:items="products"
						:category-id="2"
					/>
				</div>
			</div>
		</div>
	</Container>
</template>

<style scoped></style>
