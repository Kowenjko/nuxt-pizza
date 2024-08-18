<script setup lang="ts">
import type { IProduct } from '@/types/prisma'

const props = defineProps<{ product: IProduct }>()

const isOpen = ref(true)
const { $modalRouter } = useNuxtApp()

const close = () => {
	isOpen.value = false
	// @ts-ignore
	$modalRouter.close()
}

const isPizzaForm = computed(() => props.product.items[0].pizzaType)
</script>
<template>
	<Dialog :open="true" @update:open="close">
		<DialogContent
			class="p-0 w-[1060px] max-w-[1060px] min-h-[520px] bg-white overflow-hidden"
		>
			<DialogTitle v-show="false"> </DialogTitle>
			<DialogDescription v-show="false"> </DialogDescription>

			<ChoosePizzaForm
				v-if="isPizzaForm"
				:image-url="product.imageUrl"
				:name="product.name"
				:items="product.items"
				:ingredients="product.ingredients"
			/>
			<ChooseProductForm
				v-else
				:image-url="product.imageUrl"
				:name="product.name"
			/>
		</DialogContent>
	</Dialog>
</template>

<style scoped></style>
