<script setup lang="ts">
interface IProps {
	id: number
	name: string
	price: number
	imageUrl: string
	ingredients?: any[]
}

const props = defineProps<IProps>()

const details: any = []

if (props.ingredients) {
	details.push(...props.ingredients.map((ingredient) => ingredient.name))
}
</script>

<template>
	<PlusModalLink :to="`/product/${id}`" class="group">
		<div class="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
			<nuxt-img
				class="group-hover:translate-y-2 transition duration-300"
				:src="imageUrl"
				format="webp"
				:alt="name"
				width="215"
				height="215"
			/>
		</div>
		<AppTitle :text="name" size="sm" class="mb-1 mt-3 font-bold" />
		<p class="text-sm text-gray-400">{{ details.join(', ') }}</p>
		<div class="flex justify-between items-center mt-4">
			<span class="text-[20px]">
				от <b>{{ price }} $</b>
			</span>

			<Button variant="secondary" class="text-base font-bold">
				<IconPlus :size="20" class="mr-1" />
				Добавить
			</Button>
		</div>
	</PlusModalLink>
</template>

<style scoped></style>
