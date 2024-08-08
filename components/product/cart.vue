<script setup lang="ts">
interface IProps {
	id: number
	name: string
	price: number
	imageUrl: string
}

defineProps<IProps>()
</script>
<template>
	<div>
		<nuxt-link :to="`product/${id}`">
			<div class="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
				<nuxt-img
					:src="imageUrl"
					format="webp"
					:alt="name"
					width="215"
					height="215"
				/>
			</div>
			<AppTitle :text="name" size="sm" class="mb-1 mt-3 font-bold" />
			<p class="text-sm text-gray-400">
				Цыпленок, моцарелла, сыры чеддер и пармезан, сырный соус, томаты, соус
				альфредо, чеснок
			</p>
			<div class="flex justify-between items-center mt-4">
				<span class="text-[20px]">
					от <b>{{ price }} $</b>
				</span>

				<Button variant="secondary" class="text-base font-bold">
					<IconPlus :size="20" class="mr-1" />
					Добавить
				</Button>
			</div>
		</nuxt-link>
	</div>
</template>

<style scoped></style>
