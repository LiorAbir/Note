<template>
	<header
		class="app-header flex"
		v-scroll="handleScroll"
		:style="{ boxShadow: shadow }"
	>
		<!-- TODO -->
		<!-- <nav class="main-nav flex">
			<button class="user">L</button>
			<img
				class="svg settings-svg"
				src="../assets/icon/settings.svg"
				alt="settings"
				title="settings"
			/>
		</nav> -->

		<noteFilter @setFilterBy="setFilterBy" />

		<div class="menu-container flex">
			<router-link to="/">
				<div class="logo flex">
					<span>Noted</span>
					<img
						class="svg logo-svg"
						src="../assets/img/favicon.png"
						alt="logo"
						title="home page"
					/>
				</div>
			</router-link>
			<!-- TODO -->
			<!-- <img
				class="svg menu-svg"
				src="../assets/icon/burger.svg"
				alt="menu"
				title="main menu"
			/> -->
		</div>
	</header>
</template>
<script>
import noteFilter from './note-filter.vue'

export default {
	name: 'ap-header',
	data() {
		return {
			shadow: 'inset 0 -1px 0 0 #dadce0',
		}
	},
	methods: {
		handleScroll() {
			if (window.scrollY === 0) {
				this.shadow = 'inset 0 -1px 0 0 #dadce0'
			} else {
				this.shadow = '-1px -2px 5px 5px #9c9ea3'
			}
		},
		setFilterBy(filterBy) {
			this.$emit('setFilterBy', filterBy)
		},
	},
	components: {
		noteFilter,
	},
}
</script>

<style></style>
