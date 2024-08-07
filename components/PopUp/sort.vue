<script setup lang="ts"></script>
<template>
	<Popover>
		<PopoverTrigger>
			<div
				class="inline-flex items-center gap-1 bg-gray-50 px-5 h-[52px] rounded-2xl cursor-pointer"
			>
				<IconArrowUpDown :size="16" />
				<b>Сортировка:</b>

				<b class="text-primary">популярное</b>
			</div>
		</PopoverTrigger>
		<PopoverContent class="w-[240px]">
			<ul>
				<li
					class="hover:bg-secondary hover:text-primary p-2 px-4 cursor-pointer rounded-md"
				>
					Сначала популярное
				</li>
				<li
					class="hover:bg-secondary hover:text-primary p-2 px-4 cursor-pointer rounded-md"
				>
					Сначала недорогие
				</li>
				<li
					class="hover:bg-secondary hover:text-primary p-2 px-4 cursor-pointer rounded-md"
				>
					Сначала дорогие
				</li>
				<li
					class="hover:bg-secondary hover:text-primary p-2 px-4 cursor-pointer rounded-md"
				>
					С лучшей оценкой
				</li>
			</ul></PopoverContent
		>
	</Popover>
</template>

<style scoped></style>
