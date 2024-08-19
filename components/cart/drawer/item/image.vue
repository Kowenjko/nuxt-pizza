<script setup lang="ts">
defineProps<{ src: string }>()
</script>
<template>
	<nuxt-img
		:src="src"
		width="60"
		height="60"
		alt="pizza"
		format="webp"
		class="w-[60px] h-[60px]"
	/>
</template>

<style scoped></style>
