<script lang="ts" setup>
import { Toaster } from 'vue-sonner'

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
			<Toaster richColors position="top-center" />
		</NuxtLayout>
	</suspense>
</template>
