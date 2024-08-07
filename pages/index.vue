<script setup lang="ts">
useHead({ title: 'Главная' })
</script>
<template>
	<Container class="mt-10">
		<AppTitle text="Все пиццы" size="lg" class="font-extrabold" />
	</Container>
	<TopBar />
	<Container class="mt-10 pb-14">
		<div class="flex gap-[60px]">
			<div class="w-[250px]">
				<Filters />
			</div>
			<div class="flex-1">
				<div class="flex flex-col gap-16">Список товаров</div>
			</div>
		</div>
	</Container>
</template>

<style scoped></style>
