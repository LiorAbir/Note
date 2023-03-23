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
			<div class="search-input flex" :class="{ focused: isFocused }">
				<input
					class="filter-input"
					type="text"
					@input="setFilterBy"
					@focus="goTo('search')"
					@blur="this.isFocused = false"
					v-model="this.filter.txt"
					placeholder="Search"
				/>

				<button
					v-if="pageType.mainCat === 'search'"
					class="btn svg-btn"
					@click="goTo('back')"
				></button>
			</div>
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
export default {
	name: 'ap-header',
	props: {
		filter: Object,
		pageType: Object,
	},
	data() {
		return {
			shadow: 'inset 0 -1px 0 0 #dadce0',
			isDetailsOpen: false,
			isFocused: false,
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
		setFilterBy() {
			this.$emit('setFilterBy', this.filter)
		},
		clearFilter() {
			let emptyFilter = {
				txt: '',
				location: '',
				label: '',
				color: '',
				type: '',
			}
			this.$emit('setFilterBy', emptyFilter)
		},
		async onLogout() {
			await this.$store.dispatch({ type: 'logout' })
			this.$router.push('/login')
		},
		onToggleMenu() {
			this.$emit('toggleMenu')
		},
		goTo(page) {
			switch (page) {
				case 'notes':
					this.$router.push(`/${page}`)
					this.isFocused = false
					this.clearFilter()
					break
				case 'search':
					this.$router.push(`/${page}`)
					this.isFocused = true
					break
				case 'back':
					this.$router.go(-1)
					this.clearFilter()
					break
			}
		},
	},
	computed: {
		user() {
			return this.$store.getters.loggedInUser
		},
	},
}
</script>

<!-- // watch: {
// 	'$route.params.type': {
// 		handler(type) {
// 			// this.clearFilter()
// 			// switch (type) {
// 			// 	case 'label':
// 			// 		this.filter.location = ''
// 			// 		this.filter.label = this.$route.params.val
// 			// 		this.$emit('setFilterBy', this.filter)
// 			// 		break
// 			// 	case 'search':
// 			// 		this.filter.location = ''
// 			// 		// this.filter.label = this.$route.params.val
// 			// 		this.$emit('setFilterBy', this.filter)
// 			// 		break
// 			// 	default:
// 			// 		this.filter.location = type
// 			// 		this.filter.label = this.$route.params.val
// 			// 		this.$emit('setFilterBy', this.filter)
// 			// 		break
// 			// }
// 			if (this.$route.params.id) return
// 			if (type === 'label') {
// 				this.filter.label = this.$route.params.val
// 				this.$emit('setFilterBy', this.filter)
// 				console.log(this.$route.params)
// 				return
// 			}
// 			if (type === 'search') {
// 				this.filter.location = ''
// 				this.$emit('setFilterBy', this.filter)
// 				return
// 			}
// 			this.clearFilter()
// 			this.filter.location = type
// 			this.$emit('setFilterBy', this.filter)
// 		},
// 		immediate: true,
// 	},
// }, -->
<style></style>
