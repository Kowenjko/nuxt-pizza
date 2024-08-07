<script setup lang="ts">
// defineProps<{ items: any }>()

const cats = ['test', 'test2', 'test3', 'test4']

const active = ref('test')
</script>
<template>
	<div class="inline-flex gap-1 bg-gray-50 p-1 rounded-2xl">
		<nuxt-link
			@click="active = category"
			v-for="category in cats"
			:key="category"
			:to="`#${category}`"
			class="flex items-center font-bold h-11 rounded-2xl px-5"
			:class="{
				'bg-white shadow-md shadow-gray-200 text-primary': active === category,
			}"
			>{{ category }}</nuxt-link
		>
	</div>
</template>

<style scoped></style>
