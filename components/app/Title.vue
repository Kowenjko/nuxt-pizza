<script lang="ts">
type TitleSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

export default {
	props: {
		size: {
			type: String as PropType<TitleSize>,
			default: 'sm',
		},
		text: {
			type: String,
			default: '',
		},
		class: {
			type: String,
			default: 'sm',
		},
	},

	setup(props) {
		const mapTagBySize = {
			xs: 'h5',
			sm: 'h4',
			md: 'h3',
			lg: 'h2',
			xl: 'h1',
			'2xl': 'h1',
		} as const

		const mapClassNameBySize = {
			xs: 'text-[16px] ys-text',
			sm: 'text-[22px] ys-text',
			md: 'text-[26px] ys-text',
			lg: 'text-[32px] ys-display',
			xl: 'text-[40px] ys-display',
			'2xl': 'text-[48px] ys-display',
		} as const

		return () =>
			h(
				mapTagBySize[props.size],
				{ class: [mapClassNameBySize[props.size], props.class] },
				props.text
			)
	},
}
</script>
