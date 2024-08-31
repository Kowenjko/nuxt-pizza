<script lang="ts" setup>
import { Toaster } from 'vue-sonner'

useHead({
	titleTemplate: (titleChunk) => {
		return titleChunk ? `Nuxt Pizza | ${titleChunk}` : 'Nuxt Pizza'
	},
	link: [{ rel: 'icon', type: 'image/png', href: '/images/logo.png' }],
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
