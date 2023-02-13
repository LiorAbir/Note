<template>
	<header
		class="list-header flex"
		v-scroll="handleScroll"
		:style="{ boxShadow: shadow }"
	>
		<nav class="menu-nav flex">
			<div
				class="menu-container round"
				title="main menu"
				@click="onToggleMenu"
			>
				<img
					class="svg menu-svg"
					src="../assets/icon/burger.svg"
					alt="menu"
				/>
			</div>

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
		</nav>

		<div class="app-actions flex">
			<noteFilter @setFilterBy="setFilterBy" />
		</div>

		<div class="user-actions flex" v-if="user">
			<button
				class="user-img"
				@click="this.isDetailsOpen = !this.isDetailsOpen"
			>
				{{ user.fullname[0] }}
			</button>
		</div>
		<div class="user-details modal flex" v-if="isDetailsOpen && user">
			<div class="info flex">
				<h1 class="user-img">{{ user.fullname[0] }}</h1>
				<h4>{{ user.fullname }}</h4>
				<h5>{{ user.email }}</h5>
			</div>
			<button class="btn logout-btn" @click="onLogout">Logout</button>
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
			isDetailsOpen: false,
		}
	},
	created() {
		window.addEventListener('resize', this.handleScroll)
		if (window.innerWidth < 520) return (this.shadow = '0px 0px 2px 0px #8e8787')
	},
	methods: {
		handleScroll() {
			if (window.innerWidth < 520)
				return (this.shadow = '0px 0px 2px 0px #8e8787')
			if (window.scrollY === 0) {
				this.shadow = 'inset 0 -1px 0 0 #dadce0'
			} else {
				this.shadow = '-1px -2px 5px 5px #9c9ea3'
			}
		},
		setFilterBy(filterBy) {
			this.$emit('setFilterBy', filterBy)
		},
		async onLogout() {
			await this.$store.dispatch({ type: 'logout' })
			this.$router.push('/login')
		},
		onToggleMenu() {
			this.$emit('toggleMenu')
		},
	},
	computed: {
		user() {
			return this.$store.getters.loggedInUser
		},
	},
	components: {
		noteFilter,
	},
}
</script>

<style></style>
