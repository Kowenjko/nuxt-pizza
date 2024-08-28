<script setup lang="ts">
import { useCartStore } from '@/store'

const cartStore = useCartStore()
await cartStore.getCartItems()
</script>
<template>
	<Sheet>
		<SheetTrigger as-child>
			<slot />
		</SheetTrigger>
		<SheetContent class="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
			<div
				class="flex flex-col h-full"
				:class="{ 'justify-center': !cartStore.totalAmount }"
			>
				<SheetHeader v-if="cartStore.totalAmount > 0">
					<SheetTitle>
						В корзине
						<span class="font-bold">{{ cartStore.items.length }} товара</span>
					</SheetTitle>
					<SheetDescription> </SheetDescription>
				</SheetHeader>
				<div
					v-else
					class="flex flex-col items-center justify-center w-72 mx-auto"
				>
					<SheetHeader
						><SheetTitle></SheetTitle> <SheetDescription> </SheetDescription
					></SheetHeader>

					<nuxt-img
						src="/images/empty-box.png"
						alt="Empty cart"
						width="120"
						height="120"
						format="webp"
					/>
					<AppTitle
						size="sm"
						text="Корзина пустая"
						class="text-center font-bold my-2"
					/>
					<p class="text-center text-neutral-500 mb-5">
						Добавьте хотя бы одну пиццу, чтобы совершить заказ
					</p>
					<SheetClose>
						<Button class="w-56 h-12 text-base" size="lg">
							<IconArrowLeft class="w-5 mr-2" />
							Вернуться назад
						</Button>
					</SheetClose>
				</div>
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
						:disabled="item.disabled"
					/>
				</div>
				<SheetFooter
					v-if="cartStore.totalAmount > 0"
					class="-mx-6 bg-white p-8"
				>
					<div class="w-full">
						<div class="flex mb-4">
							<span class="flex flex-1 text-lg text-neutral-500">
								Итого
								<div
									class="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2"
								/>
							</span>

							<span class="font-bold text-lg"
								>{{ cartStore.totalAmount }} ₽</span
							>
						</div>

						<nuxt-link to="/checkout">
							<Button
								type="submit"
								class="w-full h-12 text-base"
								:loading="cartStore.loading"
							>
								Оформить заказ
								<IconArrowRight class="w-5 ml-2" />
							</Button>
						</nuxt-link>
					</div>
				</SheetFooter>
			</div>
		</SheetContent>
	</Sheet>
</template>

<style scoped></style>
