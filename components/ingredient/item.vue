<script setup lang="ts">
interface IProps {
	imageUrl: string
	name: string
	price: number
	active?: boolean
}

defineProps<IProps>()
</script>
<template>
	<div
		class="flex items-center flex-col p-1 rounded-md w-32 text-center relative cursor-pointer shadow-md bg-white"
		:class="{ 'border border-primary': active }"
		role="button"
		tabindex="0"
	>
		<IconCircleCheck
			v-if="active"
			class="absolute top-2 right-2 text-primary"
		/>
		<NuxtImg
			width="110"
			height="110"
			:src="imageUrl"
			:alt="name"
			loading="lazy"
			format="webp"
		/>
		<span class="text-xs mb-1">{{ name }}</span>
		<span class="font-bold">{{ price }} $</span>
	</div>
</template>

<style scoped></style>
