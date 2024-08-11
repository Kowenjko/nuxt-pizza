<script setup lang="ts">
import { useCategoryStore } from '@/store/category'
import type { Category } from '@prisma/client'

interface IProps {
	categories: Category[]
}

defineProps<IProps>()

const categoryStore = useCategoryStore()
</script>
<template>
	<div class="inline-flex gap-1 bg-gray-50 p-1 rounded-2xl">
		<nuxt-link
			@click=""
			v-for="category in categories"
			:key="category.id"
			:to="`#${category.name}`"
			class="flex items-center font-bold h-11 rounded-2xl px-5"
			:class="{
				'bg-white shadow-md shadow-gray-200 text-primary':
					categoryStore.activeId === category.id,
			}"
			>{{ category.name }}</nuxt-link
		>
	</div>
</template>

<style scoped></style>
