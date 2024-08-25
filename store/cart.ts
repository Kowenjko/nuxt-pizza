import { defineStore } from 'pinia'

import { getCartDetails } from '@/helpers'

export type ICartItem = {
	id: number
	quantity: number
	name: string
	imageUrl: string
	price: number
	pizzaSize?: number | null
	type?: number | null
	ingredients: Array<{ name: string; price: number }>
}

export const useCartStore = defineStore('cart', () => {
	const loading = ref(false)
	const items = ref<ICartItem[]>([])
	const error = ref(false)
	const totalAmount = ref(0)

	/**
	 *  get cart user
	 */

	const getCartItems = async () => {
		loading.value = true
		const { pending, data, error: errorData } = await useLazyFetch('/api/cart')
		loading.value = pending.value

		if (errorData.value) error.value = true

		if (data.value) {
			const result = getCartDetails(data.value)
			items.value = result.items
			totalAmount.value = result.totalAmount
		}
	}

	/**
	 *  update cart user
	 */
	const updateItemQuantity = async (id: number, quantity: number) => {
		loading.value = true

		try {
			const response = await $fetch(`/api/cart/${id}`, {
				method: 'PATCH',
				body: { quantity },
			})

			if (response) {
				const result = getCartDetails(response)
				items.value = result.items
				totalAmount.value = result.totalAmount
			}
		} catch (err) {
			error.value = true
		} finally {
			loading.value = false
		}
	}

	/**
	 *  add cart user
	 */
	const addCartItem = async (values: any) => {
		loading.value = true
		try {
			const response = await $fetch(`/api/cart`, {
				method: 'POST',
				body: values,
			})

			// console.log(response)
			if (response) {
				await getCartItems()
			}
		} catch (err) {
			error.value = true
		} finally {
			loading.value = false
		}
	}

	/**
	 *  remove cart user
	 */
	const removeCartItem = async (id: number) => {
		loading.value = true

		try {
			const response = await $fetch(`/api/cart/${id}`, { method: 'DELETE' })

			if (response) {
				const result = getCartDetails(response)
				items.value = result.items
				totalAmount.value = result.totalAmount
			}
		} catch (err) {
			error.value = true
		} finally {
			loading.value = false
		}
	}

	return {
		getCartItems,
		loading,
		items,
		totalAmount,
		updateItemQuantity,
		removeCartItem,
		addCartItem,
	}
})
