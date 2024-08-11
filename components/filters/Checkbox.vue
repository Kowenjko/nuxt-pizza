<script setup lang="ts">
interface FilterCheckboxProps {
	text?: string
	value?: string | number
	checked?: boolean
	name?: string
}

const props = defineProps<FilterCheckboxProps>()
const emit = defineEmits(['onCheckedChange'])

const tempChecked = ref(props.checked || false)

watch(tempChecked, (value) => {
	value ? emit('onCheckedChange', props.value) : emit('onCheckedChange', '')
})
</script>
<template>
	<div class="flex items-center space-x-2">
		<Checkbox
			v-model:checked="tempChecked"
			class="rounded-[8px] w-6 h-6"
			:id="`checkbox-${name}-${String(value)}`"
		/>
		<label
			:for="`checkbox-${name}-${String(value)}`"
			class="leading-none cursor-pointer flex-1"
			>{{ text }}
		</label>
		<slot />
	</div>
</template>

<style scoped></style>
