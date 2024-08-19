<script setup lang="ts">
import { useCartStore } from '@/store'

const cartStore = useCartStore()
await cartStore.fetchCartItems()
</script>
<template>
	<Sheet>
		<SheetTrigger as-child>
			<slot />
		</SheetTrigger>
		<SheetContent class="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
			<SheetHeader>
				<SheetTitle>
					В корзине
					<span class="font-bold">{{ cartStore.items.length }} товара</span>
				</SheetTitle>
				<SheetDescription> </SheetDescription>
			</SheetHeader>
			<div
				class="-mx-6 mt-5 overflow-auto flex-1 scrollbar"
				v-if="cartStore.items && cartStore.items.length > 0"
			>
				<CartDrawerItem
					class="mb-2"
					v-for="item in cartStore.items"
					:key="item.id"
					:id="item.id"
					:image-url="item.imageUrl"
					:pizzaSize="item.pizzaSize"
					:type="item.type"
					:ingredients="item.ingredients"
					:price="item.price"
					:quantity="item.quantity"
					:name="item.name"
				/>
			</div>
			<SheetFooter class="-mx-6 bg-white p-8">
				<div class="w-full">
					<div class="flex mb-4">
						<span class="flex flex-1 text-lg text-neutral-500">
							Итого
							<div
								class="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2"
							/>
						</span>

						<span class="font-bold text-lg">{{ cartStore.totalAmount }} ₽</span>
					</div>

					<nuxt-link to="/cart">
						<Button type="submit" class="w-full h-12 text-base">
							Оформить заказ
							<IconArrowRight class="w-5 ml-2" />
						</Button>
					</nuxt-link>
				</div>
			</SheetFooter>
		</SheetContent>
	</Sheet>
</template>

<style scoped></style>
