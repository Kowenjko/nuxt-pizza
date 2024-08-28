<script setup lang="ts">
defineProps<{ title?: string; contentClass?: string }>()
</script>
<template>
	<div class="bg-white rounded-3xl">
		<div
			class="flex items-center justify-between p-5 px-7 border-b border-gray-100"
			v-if="title"
		>
			<AppTitle :text="title" size="sm" class="font-bold" />
			<slot name="title" />
		</div>

		<div :class="['px-5 py-4', contentClass]">
			<slot />
		</div>
	</div>
</template>
