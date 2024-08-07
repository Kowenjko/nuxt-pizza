<script setup lang="ts">
interface Props {
	categories: any
}
</script>
<template>
	<div class="sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10">
		<Container class="flex items-center justify-between">
			<Categories />
			<div class="flex items-center">
				<PopUpSort />
			</div>
		</Container>
	</div>
</template>

<style scoped></style>
