<script setup lang="ts"></script>
<template>
	<CartDrawer>
		<Button class="group relative">
			<b>520 $</b>
			<span class="h-full w-[1px] bg-white/30 mx-3" />
			<div
				class="flex items-center gap-1 transition duration-300 group-hover:opacity-0"
			>
				<IconShoppingCart class="h-4 w-4 relative" :stroke-width="2" />
				<b>3</b>
			</div>
			<IconArrowRight
				class="absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
				:size="20"
			/>
		</Button>
	</CartDrawer>
</template>

<style scoped></style>
