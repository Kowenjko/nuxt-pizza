<script setup lang="ts">
const test = (event: any) => console.log(event)
</script>
<template>
	<div>
		<AppTitle
			text="Фильтрация"
			F
			size="sm"
			class="mb-5 font-bold pb-4 border-b border-b-neutral-100"
		/>
		<div class="flex flex-col gap-4">
			<FilterCheckbox
				name="Test"
				text="test2"
				value="Test3"
				@onCheckedChange="test"
			/>
			<FilterCheckbox
				name="Test5"
				text="test2"
				value="Test3"
				@onCheckedChange="test"
			/>
		</div>
		<div class="mt-5 border-y border-y-neutral-100 py-6 pb-7">
			<p class="font-bold mb-3">Цена от и до:</p>
		</div>
		<div class="flex gap-3 mb-5">
			<Input type="number" placeholder="0" :min="0" :max="3000" />
			<Input type="number" placeholder="3000" :min="100" :max="3000" />
		</div>
	</div>
	<RangeSlider :min="0" :max="3000" :step="10" :model-value="[500, 1700]" />
</template>

<style scoped></style>
