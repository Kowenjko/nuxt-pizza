<script lang="ts" setup>
useHead({
	titleTemplate: (titleChunk) => {
		return titleChunk ? `${titleChunk} - pizza` : 'pizza'
	},
})
</script>

<template>
	<suspense>
		<NuxtLayout>
			<PlusModalNuxtPage />
			<Toaster richColors position="top-right" />
		</NuxtLayout>
	</suspense>
</template>
