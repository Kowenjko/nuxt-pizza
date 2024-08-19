<script setup lang="ts"></script>
<template>
	<header class="border border-b">
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
				<ButtonCart />
			</div>
		</container>
	</header>
</template>

<style lang="scss" scoped></style>
