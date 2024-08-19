<script setup lang="ts"></script>
<template>
	<Sheet>
		<SheetTrigger as-child>
			<slot />
		</SheetTrigger>
		<SheetContent class="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
			<SheetHeader>
				<SheetTitle>
					В корзине <span class="font-bold">3 товара</span>
				</SheetTitle>
				<SheetDescription> </SheetDescription>
			</SheetHeader>
			<div class="-mx-6 mt-5 overflow-auto flex-1 scrollbar">
				<CartDrawerItem
					:id="1"
					image-url="https://media.dodostatic.net/image/r:233x233/11EE7D610CF7E265B7C72BE5AE757CA7.webp"
					:pizzaSize="30"
					:type="1"
					:ingredients="[{ name: 'test' }, { name: 'test 2' }]"
					:price="250"
					:quantity="1"
					:name="'dfdfvdf'"
					class="mb-2"
				/>
				<CartDrawerItem
					:id="1"
					image-url="https://media.dodostatic.net/image/r:233x233/11EE7D610CF7E265B7C72BE5AE757CA7.webp"
					:pizzaSize="30"
					:type="1"
					:ingredients="[{ name: 'test' }, { name: 'test 2' }]"
					:price="250"
					:quantity="1"
					:name="'dfdfvdf'"
					class="mb-2"
				/>
				<CartDrawerItem
					:id="1"
					image-url="https://media.dodostatic.net/image/r:233x233/11EE7D610CF7E265B7C72BE5AE757CA7.webp"
					:pizzaSize="30"
					:type="1"
					:ingredients="[{ name: 'test' }, { name: 'test 2' }]"
					:price="250"
					:quantity="1"
					:name="'dfdfvdf'"
					class="mb-2"
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

						<span class="font-bold text-lg">500 ₽</span>
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
