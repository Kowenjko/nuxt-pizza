<script setup lang="ts">
import type { IProduct } from '@/types/prisma'
import { pizzaSizes, pizzaTypes, pizzaDetailsToText } from '@/constants/pizza'

interface IProps {
	imageUrl: string
	name: string
	ingredients: IProduct['ingredients']
	items: IProduct['items']
}

const props = defineProps<IProps>()

const size = ref(pizzaSizes[0].value)
const type = ref(pizzaTypes[0].value || null)

const activeIngredients = ref<number[]>([])

const selectIngredient = (ingredient: number) => {
	const index = activeIngredients.value.indexOf(ingredient)

	if (index < 0) activeIngredients.value.push(ingredient)
	else activeIngredients.value.splice(index, 1)
}

const pizzaPrice = computed(
	() =>
		props.items.find(
			(item) =>
				item.pizzaType === Number(type.value) &&
				item.size === Number(size.value)
		)?.price || 0
)

const totalIngredientsPrice = computed(() =>
	props.ingredients
		.filter((ingredient) => activeIngredients.value.includes(ingredient.id))
		.reduce((acc, ingredient) => acc + ingredient.price, 0)
)

const totalPrice = computed(
	() => pizzaPrice.value + totalIngredientsPrice.value
)

const availablePizzas = computed(() =>
	props.items.filter((item) => item.pizzaType === Number(type.value))
)
// @ts-ignore
const textDetails = computed(() => pizzaDetailsToText(size.value, type.value))

const availablePizzaSizes = computed(() =>
	pizzaSizes.map((item) => ({
		name: item.name,
		value: item.value,
		disabled: !availablePizzas.value.some(
			(pizza) => pizza.size === +item.value
		),
	}))
)

const addToCart = () => {
	console.log({
		size: size.value,
		type: type.value,
		ingredients: activeIngredients.value,
	})
}

watch(type, () => {
	const currentSize = availablePizzaSizes.value.find(
		(item) => item.value === size.value && !item.disabled
	)
	const availableSize = availablePizzaSizes.value.find((item) => !item.disabled)
	if (availableSize && !currentSize) size.value = availableSize.value
})
</script>
<template>
	<div class="flex flex-1">
		<ProductImage :image-url="imageUrl" :size="+size" type="pizza" />
		<div class="w-[490px] bg-[#f7f6f5] p-7">
			<AppTitle :text="name" size="md" class="font-extrabold mb-1" />
			<p class="text-gray-400">{{ textDetails }}</p>
			<div class="flex flex-col gap-5 mt-4">
				<ProductVariant :items="availablePizzaSizes" v-model="size" />
				<ProductVariant :items="pizzaTypes" v-model="type" />
			</div>
			<div
				class="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5"
			>
				<div
					class="grid grid-cols-3 gap-3"
					v-if="ingredients && ingredients.length > 0"
				>
					<IngredientItem
						v-for="ingredient in ingredients"
						:key="ingredient.id"
						:name="ingredient.name"
						:image-url="ingredient.imageUrl"
						:price="ingredient.price"
						:active="activeIngredients.includes(ingredient.id)"
						@click="selectIngredient(ingredient.id)"
					/>
				</div>
			</div>

			<Button
				class="h-[55px] px-10 text-base rounded-[18px] w-full mt-8"
				@click="addToCart"
			>
				Добавить в корзину за {{ totalPrice }} $
			</Button>
		</div>
	</div>
</template>
