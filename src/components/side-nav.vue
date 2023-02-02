<template>
	<nav
		class="side-nav flex"
		@mouseover="isHover = true"
		@mouseleave="isHover = false"
		:class="{
			open: isHover && !isMenuOpen,
			close: !isHover && !isMenuOpen,
			'open-by-btn': isMenuOpen,
		}"
	>
		<div
			class="page-btn btn flex"
			v-for="page in pages"
			:class="{ active: page.name === this.chosenPage }"
			@click="onGoTo(page.name)"
		>
			<img class="img" :src="page.svg" alt="svg" />
			<h3 class="name">{{ page.name }}</h3>
		</div>
	</nav>
</template>
<script>
export default {
	name: 'side-nav',
	props: {
		isMenuOpen: Boolean,
		chosenPage: String,
	},
	data() {
		return {
			isHover: false,
			// chosenPage: 'notes',
			pages: [
				{
					name: 'notes',
					svg: 'src/assets/icon/lightbulb.svg',
				},
				{
					name: 'edit labels',
					svg: 'src/assets/icon/pencil.svg',
				},
				{
					name: 'archive',
					svg: 'src/assets/icon/archive-in.svg',
				},
				{
					name: 'trash',
					svg: 'src/assets/icon/trash.svg',
				},
			],
		}
	},
	created() {
		const { type } = this.$route.params
		this.$emit('changePage', type)
	},
	methods: {
		onGoTo(page) {
			this.$emit('changePage', page)
		},
	},
	watch: {
		'$route.params.type': {
			handler(type) {
				if (this.$route.params.id) return
				this.$emit('changePage', type)
			},
			immediate: true,
		},
		// $route: {
		// 	immediate: true,
		// 	// deep: true,
		// 	handler: function (newVal, oldVal) {
		// 		this.$emit('changePage', newVal.params.type)
		// 	},
		// },
	},
}
</script>
