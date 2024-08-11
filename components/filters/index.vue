<script setup lang="ts">
import type { Ingredient } from '@prisma/client'
import qs from 'qs'

const { data: ingredients, pending } = await useLazyFetch<Ingredient[]>(
	'/api/ingredients'
)

const getDefaultItems = computed(() => ingredients.value?.slice(0, 6) || [])

const router = useRouter()
const route = useRoute()

const PRICE_MIN = 0
const PRICE_MAX = 1000

const getQuery = (query: string) =>
	(route.query?.[query] as string)?.split(',') || []

const priceFrom = +route.query?.priceFrom! || PRICE_MIN
const priceTo = +route.query?.priceTo! || PRICE_MAX

const selectSizes = ref(getQuery('sizes'))
const selectPizzaTypes = ref(getQuery('pizzaTypes'))
const selectIngredients = ref(getQuery('ingredients'))

const price = reactive({ priceFrom, priceTo })
const tempPrice = ref([priceFrom, priceTo])

const sizes = [
	{ name: '20 см', id: 20 },
	{ name: '30 см', id: 30 },
	{ name: '40 см', id: 40 },
]

const pizzaTypes = [
	{ name: 'Тонкое', id: 1 },
	{ name: 'Традиционное', id: 2 },
]

const filters = computed(() => {
	return {
		sizes: toRaw(selectSizes.value),
		pizzaTypes: toRaw(selectPizzaTypes.value),
		ingredients: toRaw(selectIngredients.value),
		...price,
	}
})

watch(tempPrice, ([from, to]) => {
	price.priceFrom = from
	price.priceTo = to
})

watch(price, () => (tempPrice.value = [price.priceFrom, price.priceTo]))

watch(filters, (value) => {
	let query = ''

	if (value.priceFrom === PRICE_MIN && value.priceTo === PRICE_MAX) {
		const { priceFrom, priceTo, ...data } = value
		query = qs.stringify(data, { arrayFormat: 'comma' })
	} else query = qs.stringify(value, { arrayFormat: 'comma' })

	router.push(`?${query}`)
})
</script>
<template>
	<div class="sticky top-28">
		<div>
			<AppTitle
				text="Фильтрация"
				size="sm"
				class="mb-5 font-bold pb-4 border-b border-b-neutral-100"
			/>
			<div class="flex flex-col gap-4">
				<FiltersCheckboxGroup
					title="Тип тест"
					name="pizzaTypes"
					class="mb-5"
					:items="pizzaTypes"
					v-model:value="selectPizzaTypes"
				/>
				<FiltersCheckboxGroup
					title="Размеры"
					name="sizes"
					class="mb-5"
					:items="sizes"
					v-model:value="selectSizes"
				/>
			</div>
			<div class="mt-5 border-y border-y-neutral-100 py-6 pb-7">
				<p class="font-bold mb-3">Цена от и до:</p>
			</div>
			<div class="flex gap-3 mb-5">
				<Input
					type="number"
					:placeholder="PRICE_MIN"
					:min="PRICE_MIN"
					:max="PRICE_MAX"
					v-model="price.priceFrom"
				/>
				<Input
					type="number"
					:placeholder="PRICE_MAX"
					:min="100"
					:max="PRICE_MAX"
					v-model="price.priceTo"
				/>
			</div>
		</div>
		<RangeSlider
			:min="PRICE_MIN"
			:max="PRICE_MAX"
			:step="10"
			v-model="tempPrice"
		/>
		<FiltersCheckboxGroup
			title="Формат"
			name="ingredients"
			class="mt-10"
			:limit="6"
			:default-items="getDefaultItems"
			:items="ingredients || []"
			:loading="pending"
			v-model:value="selectIngredients"
		/>
	</div>
</template>

<style scoped></style>
