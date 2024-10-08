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
	disabled?: boolean
}

export const useCartStore = defineStore('cart', () => {
	const loading = ref(false)
	const items = ref<ICartItem[]>([])
	const error = ref(false)
	const totalAmount = ref(0)
	const productId = ref<number | null>(null)

	/**
	 *  get cart user
	 */

	const getCartItems = async () => {
		loading.value = true

		try {
			const response = await $fetch('/api/cart')
			if (response) {
				const result = getCartDetails(response)
				items.value = result.items
				totalAmount.value = result.totalAmount
				loading.value = false
			}
		} catch (err) {
			error.value = true
			loading.value = false
		} finally {
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
		productId.value = values.productItemId
		try {
			const response = await $fetch(`/api/cart`, {
				method: 'POST',
				body: values,
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
			productId.value = null
		}
	}

	/**
	 *  remove cart user
	 */
	const removeCartItem = async (id: number) => {
		loading.value = true

		try {
			items.value = items.value.map((item) =>
				item.id === id ? { ...item, disabled: true } : item
			)
			const response = await $fetch(`/api/cart/${id}`, { method: 'DELETE' })

			if (response) {
				const result = getCartDetails(response)
				items.value = result.items
				totalAmount.value = result.totalAmount
			}
		} catch (err) {
			error.value = true
			items.value = items.value.map((item) =>
				item.id === id ? { ...item, disabled: false } : item
			)
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
		productId,
	}
})
