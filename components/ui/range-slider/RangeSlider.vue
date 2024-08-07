<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import type { SliderRootEmits, SliderRootProps } from 'radix-vue'
import {
	SliderRange,
	SliderRoot,
	SliderThumb,
	SliderTrack,
	useForwardPropsEmits,
} from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps<SliderRootProps & {	class?: HTMLAttributes['class']}>()
const emits = defineEmits<SliderRootEmits>()

 const initialValue = Array.isArray(props.modelValue) ? props.modelValue : [props.min, props.max];
 const localValues = ref(initialValue)

const delegatedProps = computed(() => {
	const { class: _, ...delegated } = props

	return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)

// watch([()=>props.min,()=>props.max, ()=>props.modelValue],()=>localValues.value= Array.isArray(props.modelValue) ? props.modelValue : [props.min, props.max])
</script>

<template>
	<SliderRoot
		:class="
			cn(
				'relative flex w-full touch-none select-none mb-6 items-center',
				props.class
			)
		"
		v-bind="forwarded"
		v-model="localValues"
	>
		<SliderTrack
			class="relative h-1 w-full grow overflow-hidden rounded-full bg-primary/20"
		>
			<SliderRange class="absolute h-full bg-primary" />
		</SliderTrack>
		<div
			class="absolute text-center"
			v-for="(v, index) in localValues"
			:key="index"
			:style="`left: calc(${
				((v - min) / (max - min)) * 100
			}% + 0px); top: 10px;`"
		>
			<span class="text-sm">{{ v }}</span>
		</div>
		<SliderThumb
			v-for="(_, key) in localValues"
			:key="key"
			class="block h-4 w-4 rounded-full border border-primary/50 bg-white shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
		/>
	</SliderRoot>
</template>
