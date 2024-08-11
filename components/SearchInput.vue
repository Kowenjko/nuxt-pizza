<script setup lang="ts">
import type { Product } from '@prisma/client'
import { onClickOutside, refDebounced } from '@vueuse/core'

const focused = ref(false)
const searchRef = ref(null)
const search = ref('')

const debouncedSearch = refDebounced(search, 300)

onClickOutside(searchRef, () => (focused.value = false))

const url = computed(() => {
	return `/api/products/search?query=${debouncedSearch.value.toLowerCase()}`
})

const { data: products } = await useFetch<Product[]>(url)

const goToProduct = async (id: number) => {
	await navigateTo(`/product/${id}`)
	focused.value = false
	search.value = ''
}
</script>
<template>
	<div
		v-if="focused"
		class="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30"
	></div>
	<div
		class="flex rounded-2xl flex-1 justify-between relative h-11"
		:class="{ 'z-30': focused }"
		ref="searchRef"
	>
		<IconSearch
			class="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400"
		/>
		<input
			class="rounded-2xl outline-none w-full bg-gray-100 pl-11"
			type="text"
			placeholder="Найти пиццу..."
			@focus="focused = true"
			v-model="search"
		/>
		<div
			v-if="products && products.length > 0 && search"
			class="absolute w-full bg-white rounded-xl py-2 top-14 shadow-md invisible transition-all duration-200 opacity-0 z-30"
			:class="[focused ? '!visible opacity-100 top-12' : '']"
		>
			<nuxt-link
				class="flex items-center gap-3 px-3 py-2 hover:bg-primary/10 cursor-pointer transition-all"
				@click="goToProduct(product.id)"
				v-for="product in products"
				:key="product.id"
			>
				<nuxt-img
					class="rounded-sm"
					:src="product.imageUrl"
					width="32"
					height="32"
					:alt="product.name"
					format="webp"
				/>
				<span>
					{{ product.name }}
				</span>
			</nuxt-link>
		</div>
	</div>
</template>

<style scoped></style>
