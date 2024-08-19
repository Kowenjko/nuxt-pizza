<script setup lang="ts">
interface IProps {
	size?: 'sm' | 'lg'
	disabled?: boolean
	type?: 'plus' | 'minus'
}

defineProps<IProps>()
</script>
<template>
	<Button
		variant="outline"
		:disabled="disabled"
		class="p-0 hover:bg-primary hover:text-white disabled:bg-white disabled:border-gray-400 disabled:text-gray-400"
		:class="[
			size === 'sm'
				? 'w-[30px] h-[30px] rounded-[10px]'
				: 'w-[38px] h-[38px] rounded-md',
		]"
	>
		<IconPlus v-if="type === 'plus'" :class="size === 'sm' ? 'h-4' : 'h-5'" />
		<IconMinus v-else :class="size === 'sm' ? 'h-4' : 'h-5'" />
	</Button>
</template>

<style scoped></style>
