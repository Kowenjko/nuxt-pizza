import type { Product, ProductItem, Ingredient, Category } from '@prisma/client'

export type IProduct = Product & {
	items: ProductItem[]
	ingredients: Ingredient[]
	category: Category & { products: Product[] }
}
