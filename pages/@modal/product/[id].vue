<script lang="ts" setup>
import type { IProduct } from '@/types/prisma'

const parentRouter = useParallelRouter()
const route = parentRouter?.currentRoute.value

const { data: product } = await useFetch<IProduct>(
	`/api/product/${route?.params.id}`
)

if (!product.value)
	showError({
		statusCode: 404,
		statusMessage: `Нет таково продукта ${route?.params.id}`,
	})
</script>

<template>
	<ModalsChooseProduct v-if="product" :product="product" />
</template>
