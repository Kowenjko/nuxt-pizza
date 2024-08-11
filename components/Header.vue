<script setup lang="ts">
import { cn } from '@/lib/utils'
</script>
<template>
	<header :class="cn('border border-b')">
		<container class="flex items-center justify-between py-8">
			<nuxt-link to="/">
				<div class="flex items-center gap-4">
					<nuxt-img
						src="/images/logo.png"
						alt="Logo"
						width="35px"
						height="35px"
					/>
					<div>
						<h1 class="text-2xl uppercase font-black">Next Pizza</h1>
						<p class="text-sm text-gray-400 leading-3">вкусней уже некуда</p>
					</div>
				</div>
			</nuxt-link>
			<div class="mx-10 flex-1">
				<SearchInput />
			</div>
			<div class="flex items-center gap-3">
				<Button variant="outline" class="flex items-center gap-1">
					<IconUser :size="16" />
					Войти
				</Button>
				<div>
					<Button class="group relative">
						<b>520 $</b>
						<span class="h-full w-[1px] bg-white/30 mx-3" />
						<div
							class="flex items-center gap-1 transition duration-300 group-hover:opacity-0"
						>
							<IconShoppingCart class="h-4 w-4 relative" :stroke-width="2" />
							<b>3</b>
						</div>
						<IconArrowRight
							class="absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
							:size="20"
						/>
					</Button>
				</div>
			</div>
		</container>
	</header>
</template>

<style lang="scss" scoped></style>
