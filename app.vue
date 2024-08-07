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
			<NuxtPage />
		</NuxtLayout>
	</suspense>
</template>
