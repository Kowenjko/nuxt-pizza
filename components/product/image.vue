<script setup lang="ts">
import { cn } from '@/lib/utils'
defineProps<{
	imageUrl: string
	size?: 20 | 30 | 40 | any
	type: 'pizza' | 'product'
}>()
</script>
<template>
	<div class="flex items-center justify-center flex-1 relative w-full">
		<nuxt-img
			:class="
				cn('relative left-2 top-2 transition-all z-10 	duration-300', {
					'w-[300px] h-[300px]': size === 20,
					'w-[400px] h-[400px]': size === 30,
					'w-[500px] h-[500px]': size === 40,
					'w-[350px] h-[350px]': type === 'product',
				})
			"
			:src="imageUrl"
		/>

		<div
			class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed border-2 rounded-full border-gray-200 w-[450px] h-[450px]"
			v-if="type === 'pizza'"
		/>
		<div
			class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dotted border-2 rounded-full border-gray-100 w-[370px] h-[370px]"
			v-if="type === 'pizza'"
		/>
	</div>
</template>

<style scoped></style>
