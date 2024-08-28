<script setup lang="ts">
import { useCartStore } from '@/store'

const cartStore = useCartStore()
</script>
<template>
	<ClientOnly>
		<CartDrawer>
			<Button
				:disabled="cartStore.loading"
				:loading="cartStore.loading"
				class="group relative"
				:class="{ 'w-[130px]': cartStore.loading }"
			>
				<b>{{ cartStore.totalAmount }} $</b>
				<span class="h-full w-[1px] bg-white/30 mx-3" />
				<div
					class="flex items-center gap-1 transition duration-300 group-hover:opacity-0"
				>
					<IconShoppingCart class="h-4 w-4 relative" :stroke-width="2" />
					<b>{{ cartStore.items.length }}</b>
				</div>
				<IconArrowRight
					class="absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
					:size="20"
				/>
			</Button>
		</CartDrawer>
	</ClientOnly>
</template>

<style scoped></style>
