<template>
	<nav
		v-if="board"
		class="side-nav flex"
		@mouseover="checkWindowWidth()"
		@mouseleave="isHover = false"
		:class="{
			open: isHover && !isMenuOpen,
			close: !isHover && !isMenuOpen,
			'open-by-btn': isMenuOpen,
		}"
	>
		<router-link to="/">
			<div class="logo flex">
				<img
					class="svg logo-svg"
					src="../assets/img/favicon.png"
					alt="logo"
					title="home page"
				/>
				<h2>Noted<span>.</span></h2>
			</div>
		</router-link>
		<div
			class="page-btn btn flex"
			v-for="page in pages"
			@click="onGoTo(page.name)"
			:class="{
				active:
					page.name === this.chosenPage.mainCat && !this.chosenPage.subCat,
			}"
		>
			<img class="img" :src="page.svg" alt="svg" />
			<h3 class="name">{{ page.name }}</h3>
		</div>

		<div
			v-for="label in board.labels"
			:class="{ active: label === this.chosenPage.subCat }"
			class="page-btn btn flex"
			@click="onGoTo('label', label)"
		>
			<img class="img" src="../assets/icon/empty-label.svg" alt="svg" />
			<h3 class="name">{{ label }}</h3>
		</div>
	</nav>
</template>
<script>
export default {
	name: 'side-nav',
	props: {
		isMenuOpen: Boolean,
		chosenPage: Object,
		board: Object,
	},
	data() {
		return {
			isHover: false,
			pages: [
				{
					name: 'notes',
					svg: './src/assets/icon/lightbulb.svg',
				},
				{
					name: 'edit labels',
					svg: './src/assets/icon/pencil.svg',
				},
				{
					name: 'archive',
					svg: './src/assets/icon/archive-in.svg',
				},
				{
					name: 'trash',
					svg: './src/assets/icon/trash.svg',
				},
			],
		}
	},
	created() {
		const { type, val } = this.$route.params
		this.$emit('changePage', type, val)
	},
	methods: {
		onGoTo(page, label) {
			this.$emit('changePage', page, label)
		},
		checkWindowWidth() {
			if (window.innerWidth < 520) return
			this.isHover = true
		},
		onClose() {
			this.$emit('close')
		},
	},
}
</script>

<!-- // watch: {
// 	'$route.params.type': {
// 		// handler(type) {
// 		// 	if (this.$route.params.id) return
// 		// 	// if (type === 'label') {
// 		// 	// 	return
// 		// 	// }
// 		// 	this.$emit('changePage', type)
// 		// },
// 		// immediate: true,
// 	},
// }, -->
