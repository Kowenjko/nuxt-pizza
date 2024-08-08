<script setup lang="ts">
interface FilterCheckboxProps {
	text: string
	value: string
	checked?: boolean
	name?: string
}

interface IProps {
	title: string
	items: FilterCheckboxProps[]
	defaultItems?: FilterCheckboxProps[]
	limit?: number
	searchInputPlaceholder?: string
	className?: string
	selectedIds?: Set<string>
	loading?: boolean
	name?: string
}

const props = withDefaults(defineProps<IProps>(), {
	limit: 5,
	searchInputPlaceholder: '...Поиск',
})

const showAll = ref(false)
const searchValue = ref('')

const filteredItems = computed(() =>
	props.items.filter((item) =>
		item.text.toLowerCase().includes(searchValue.value.toLowerCase())
	)
)

const filtered = computed(() =>
	showAll.value
		? filteredItems.value
		: props.defaultItems?.slice(0, props.limit)
)
</script>
<template>
	<div>
		<template v-if="loading">
			<div>
				<p class="font-bold mb-3">{{ title }}</p>
				<div
					v-for="index in limit"
					:key="index"
					class="w-full mb-4 h-6 bg-gray-200 rounded-[8px] animate-pulse"
				/>
				<div class="w-28 h-4 bg-gray-200 rounded-[8px] animate-pulse" />
			</div>
		</template>
		<template v-else>
			<div>
				<p class="font-bold mb-3">{{ title }}</p>
				<div v-if="showAll" class="mb-5">
					<Input
						:placeholder="searchInputPlaceholder"
						class="bg-gray-50 border-none"
						v-model="searchValue"
					/>
				</div>
				<div class="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
					<FiltersCheckbox
						v-for="item in filtered"
						:key="String(item.value)"
						:text="item.text"
						:value="item.value"
						:name="name"
					/>
				</div>
				<div
					v-if="items &&items.length > limit!"
					:class="showAll ? 'border-t border-t-neutral-100 mt-4' : ''"
				>
					<button class="text-primary mt-3" @click="showAll = !showAll">
						{{ showAll ? 'Скрыть' : '+ Показать все' }}
					</button>
				</div>
			</div>
		</template>
	</div>
</template>

<style scoped></style>
