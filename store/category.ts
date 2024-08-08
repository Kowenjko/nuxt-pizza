import { defineStore } from 'pinia'

export const useCategoryStore = defineStore('category', () => {
	const activeId = ref(1)
	const setActiveCategoryId = (id: number) => (activeId.value = id)

	return { activeId, setActiveCategoryId }
})
