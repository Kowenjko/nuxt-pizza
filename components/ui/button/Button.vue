<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Primitive, type PrimitiveProps } from 'radix-vue'
import { type ButtonVariants, buttonVariants } from '.'
import { cn } from '@/lib/utils'

interface Props extends PrimitiveProps {
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  class?: HTMLAttributes['class']
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  as: 'button',
})
</script>

<template>
	<Primitive
		:as="as"
		:as-child="asChild"
		:class="cn(buttonVariants({ variant, size }), props.class)"
	>
		<IconLoader2 v-if="loading" class="w-5 h-5 animate-spin" />
		<slot v-else />
	</Primitive>
</template>
