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
	},
	data() {
		return {
			isHover: false,
			chosenPage: 'notes',
			pages: [
				{
					name: 'notes',
					svg: 'src/assets/icon/lightbulb.svg',
				},
				// {
				// 	name: 'reminders',
				// 	svg: 'src/assets/icon/trash.svg',
				// },
				{
					name: 'archive',
					svg: 'src/assets/icon/archive.svg',
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
		this.chosenPage = type
	},
	methods: {
		onGoTo(page) {
			this.$emit('changePage', page)
			this.chosenPage = page
		},
	},
}
</script>
