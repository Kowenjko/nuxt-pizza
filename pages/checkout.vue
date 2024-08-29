<script setup lang="ts">
import { useCartStore } from '@/store'

const cartStore = useCartStore()
const { $toast } = useNuxtApp()
const loading = ref(true)
const loadingOrder = ref(false)

if(cartStore.items.length<=0) await cartStore.getCartItems()

const VAT = 15
const DELIVERY_PRICE = 250

const formData = reactive({
  email:'',
  firstName:'',
  lastName:'',
  phone:'',
  address:'',
  comment:'',
})

const vatPrice = computed(()=>cartStore.totalAmount * VAT / 100)
const totalPrice = computed(()=>cartStore.totalAmount + vatPrice.value + DELIVERY_PRICE)

const onSubmit = async()=>{
  loadingOrder.value = true
try {

  const url = await $fetch('/api/order',{
    method:'POST',
    body:{...formData, totalAmount: totalPrice.value}
  })
  $toast.success('Заказ успешно оформлен!')

if(url) location.href = url

  
} catch (error) {
  $toast.error('Не удалось создать заказ')
} finally{
  loadingOrder.value = false
}

}

onMounted(() => {
  loading.value = false
})

definePageMeta({ layout: 'checkout' })
</script>
<template>
	
	  <Container class="py-5">
  		<AppTitle text="Оформление заказа" size="lg" class="font-extrabold mb-8" />  
  		<div class="flex gap-10">
  			<div class="flex flex-col gap-10 flex-1 mb-20">
  				<WhiteBlock title="1. Корзина">
  					<!-- <template #title>TEst</template> -->
            <div class="flex flex-col gap-5" v-if="loading"> <SkeletonsCartItem v-for="i in 3" :key="i"/></div>
  					<ClientOnly>
  					  <div class="flex flex-col gap-5" v-if=" cartStore.items &&  cartStore.items.length > 0">
    					  <CheckoutCartItem 
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
  					</ClientOnly>
  				</WhiteBlock>
  				<WhiteBlock title="2. Персональный данные">
  					<div class="grid grid-cols-2 gap-5">
  						<Input name="firstName" class="text-base" placeholder="Имя" v-model="formData.firstName"/>
  						<Input name="lastName" class="text-base" placeholder="Фамилия" v-model="formData.lastName"/>
  						<Input name="email" class="text-base" placeholder="E-Mail" v-model="formData.email"/>
  						<Input name="phone" class="text-base" placeholder="Телефон" v-model="formData.phone"/>
  					</div>
  				</WhiteBlock>
  				<WhiteBlock title="3. Адрес доставки">
  					<div class="flex flex-col gap-5">
               <Input name="firstName" class="text-base" placeholder="Введите адрес..." v-model="formData.address"/> 
                  
              <Textarea  rows="5"class="text-base rounded-md px-3 py-2 border" placeholder="Комментарий к заказу" v-model="formData.comment"/>
            </div class="flex flex-col gap-5">
  				</WhiteBlock>
  			</div>
  			<div class="w-[450px]">
          <WhiteBlock  class="p-6 sticky top-4">
  					<div class="flex flex-col gap-1">
              <span class="text-xl">Итого:</span>
              <ClientOnly>
                <!-- <Skeleton v-if="cartStore.loading" class="w-[130px] h-9"/> -->
                <span  class="text-3xl font-extrabold">{{ totalPrice }} $</span>
              </ClientOnly>
            </div>


           <div class="flex flex-col gap-4" v-if="loading">
            <Skeleton class="w-[130px] h-9 mb-2"/>
             <Skeleton class="w-full h-7" v-for="i in 3" :key="i"  />
            </div>
              <ul v-else>
                <li class="flex my-4 items-center">
                  <IconPackage class="mr-2 text-gray-300" :size="18"/>
                  <span class="flex flex-1 text-lg text-neutral-500">Стоимость товаров:
                    <div class="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-3"></div>
                  </span>
                  <ClientOnly > 
                   <!-- <Skeleton v-if="cartStore.loading" class="w-[80px] h-7"/> -->
                  <span  class="font-bold text-lg"> {{ cartStore.totalAmount }} $</span>
                </ClientOnly>
                </li>
                <li class="flex my-4 items-center">
                  <IconPercent class="mr-2 text-gray-300" :size="18"/>
                  <span class="flex flex-1 text-lg text-neutral-500">Налоги:
                    <div class="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-3"></div>
                  </span>
                   <!-- <Skeleton v-if="cartStore.loading" class="w-[80px] h-7"/> -->
                  <span  class="font-bold text-lg"> {{ vatPrice }} $</span>
                </li>
                <li class="flex my-4 items-center">
                  <IconTruck class="mr-2 text-gray-300" :size="18"/>
                  <span class="flex flex-1 text-lg text-neutral-500">Доставка:
                    <div class="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-3"></div>
                  </span>
                   <!-- <Skeleton v-if="cartStore.loading" class="w-[80px] h-7"/> -->
                  <span  class="font-bold text-lg"> {{ DELIVERY_PRICE }} $</span>
                </li>
              </ul>
           
  
            <Button @click="onSubmit" :loading="loadingOrder" class="w-full h-14 rounded-2xl mt-6 text-base font-bold">Перейти к оплате <IconArrowRight class="w-5 ml-2"/></Button>
  				</WhiteBlock>
        
        </div>
  		</div>
  	</Container>
	
</template>

<style scoped></style>
