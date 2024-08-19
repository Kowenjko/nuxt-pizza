<script setup lang="ts">
interface IProps {
	name: string
	pizzaSize?: number | null
	type?: number | null
	ingredients?: any[]
}

const props = defineProps<IProps>()

const details: any = []

if (props.pizzaSize) {
	const typeName = props.type === 1 ? 'Традиционное' : 'Тонкое'
	details.push(`${typeName} ${props.pizzaSize} см`)
}

if (props.ingredients) {
	details.push(...props.ingredients.map((ingredient) => ingredient.name))
}
</script>
<template>
	<div>
		<div class="flex items-center justify-between">
			<h2 class="text-lg font-bold flex-1 leading-6">{{ name }}</h2>
		</div>
		<p v-if="details.length > 0" class="text-xs text-gray-400">
			{{ details.join(', ') }}
		</p>
	</div>
</template>

<style scoped></style>
