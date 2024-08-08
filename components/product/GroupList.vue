<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core'
import { useCategoryStore } from '@/store/category'

interface IProps {
	title: string
	items: any
	listClass?: string
	categoryId: number
}

const props = defineProps<IProps>()

const intersectionRef = ref(null)
const rootRef = ref(null)
const isVisible = ref()
const { setActiveCategoryId } = useCategoryStore()

const { isActive, pause, resume } = useIntersectionObserver(
	intersectionRef,
	([{ isIntersecting }]) => {
		isVisible.value = isIntersecting
	},
	{ threshold: 0.4 }
)

watch(isVisible, () => {
	if (isVisible.value) setActiveCategoryId(props.categoryId)
})

const filterProducts = computed(() =>
	props.items?.filter((product: any) => product.items.length > 0)
)
</script>
<template>
	<div class="font-extrabold mb-5" :id="title" ref="rootRef">
		<AppTitle :text="title" size="lg" class="font-extrabold mb-5" />
		<div
			ref="intersectionRef"
			class="grid grid-cols-3 gap-[50px]"
			:class="listClass"
		>
			<ProductCart
				v-for="product in filterProducts"
				:key="product.id"
				:id="product.id"
				:name="product.name"
				:price="product.items[0].price"
				:image-url="product.imageUrl"
			/>
		</div>
	</div>
</template>

<style scoped></style>
