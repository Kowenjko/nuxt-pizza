<script setup lang="ts">
useHead({ title: 'Корзина' })
</script>
<template>
	<Header class="bg-[#f4f1ee]" :hasSearch="false" :hasCart="false" />
	<main class="min-h-screen bg-[#f4f1ee]">
		<slot />
	</main>
</template>

<style scoped></style>
