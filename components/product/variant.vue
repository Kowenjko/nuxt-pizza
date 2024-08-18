<script setup lang="ts">
type Variant = {
	name: string
	value: string
	disabled?: boolean
}

interface IProps {
	items: readonly Variant[]
}

defineProps<IProps>()
const emit = defineEmits(['button-click'])

const model = defineModel()
</script>
<template>
	<div
		v-if="items && items.length > 0"
		class="flex justify-between bg-[#F3F3F7] rounded-3xl p-1 select-none"
	>
		<button
			v-for="item in items"
			@click="model = item.value"
			:key="item.name"
			class="flex items-center justify-center cursor-pointer h-[30px] px-5 flex-1 rounded-3xl transition-all duration-400 text-sm"
			:class="{
				'bg-white shadow': item.value === model,
				'text-gray-500 opacity-50 pointer-events-none': item.disabled,
			}"
		>
			{{ item.name }}
		</button>
	</div>
</template>

<style scoped></style>
