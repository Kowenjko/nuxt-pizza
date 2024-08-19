<script setup lang="ts">
interface IProps {
	value?: number
	size?: 'sm' | 'lg'
}
defineProps<IProps>()
</script>
<template>
	<div class="inline-flex items-center justify-between gap-3">
		<ButtonCountIcon
			@click="$emit('minus')"
			:disabled="value === 1"
			:size="size"
			type="minus"
		/>

		<b :class="size === 'sm' ? 'text-sm' : 'text-md'">{{ value }}</b>

		<ButtonCountIcon @click="$emit('plus')" :size="size" type="plus" />
	</div>
</template>

<style scoped></style>
