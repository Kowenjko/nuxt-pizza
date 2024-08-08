<script setup lang="ts">
import { useCategoryStore } from '@/store/category'

const categoryStore = useCategoryStore()

// defineProps<{ items: any }>()

const cats = ['Пиццы', 'Завтрак', 'test3', 'test4']
</script>
<template>
	<div class="inline-flex gap-1 bg-gray-50 p-1 rounded-2xl">
		<nuxt-link
			@click=""
			v-for="(category, index) in cats"
			:key="category"
			:to="`#${category}`"
			class="flex items-center font-bold h-11 rounded-2xl px-5"
			:class="{
				'bg-white shadow-md shadow-gray-200 text-primary':
					categoryStore.activeId === index + 1,
			}"
			>{{ category }}</nuxt-link
		>
	</div>
</template>

<style scoped></style>
