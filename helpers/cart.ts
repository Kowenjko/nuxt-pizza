type ReturnProps = {
	items: any
	totalAmount: number
}

export const calcCartItemTotalAmount = (item: any): number => {
	return (
		(item.productItem.price +
			item.ingredients.reduce(
				(acc: number, ingredient: any) => acc + ingredient.price,
				0
			)) *
		item.quantity
	)
}

export const getCartDetails = (data: any): ReturnProps => {
	const items = data.items.map((item: any) => ({
		id: item.id,
		quantity: item.quantity,
		name: item.productItem.product.name,
		imageUrl: item.productItem.product.imageUrl,
		price: calcCartItemTotalAmount(item),
		pizzaSize: item.pizzaSize,
		type: item.type,
		ingredients: item.ingredients.map((ingredient: any) => ({
			name: ingredient.name,
			price: ingredient.price,
		})),
	}))

	return { items, totalAmount: data?.totalAmount || 0 }
}
