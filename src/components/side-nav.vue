<template>
	<nav
		class="side-nav"
		@mouseover="isHover = true"
		@mouseleave="isHover = false"
		:class="{ open: isHover, close: !isHover }"
	>
		<div
			class="page-btn btn flex"
			v-for="page in pages"
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
	data() {
		return {
			isHover: false,
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
	methods: {
		onGoTo(page) {
			this.$emit('changePage', page)
		},
	},
}
</script>
