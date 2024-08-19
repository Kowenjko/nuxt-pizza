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

	const fetchCartItems = async () => {
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
	const updateItemQuantity = () => {}

	/**
	 *  add cart user
	 */
	const addCartItem = () => {}

	/**
	 *  remove cart user
	 */
	const removeCartItem = () => {}

	return { fetchCartItems, loading, items, totalAmount }
})
