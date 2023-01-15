<template>
	<header
		class="app-header flex"
		v-scroll="handleScroll"
		:class="{ 'header-sticky': isSticky }"
	>
		<div class="logo">Noted <span>.</span></div>
		<nav class="main-nav flex">
			<div class="socials flex">
				<router-link
					to="/note"
					class="btn social-btn facebook"
					title="facebbok"
				>
					<img src="../assets/icon/facebook.svg" alt="facebook icon" />
				</router-link>
				<router-link
					to="/note"
					class="btn social-btn twitter"
					title="twitter"
					><img src="../assets/icon/twitter.svg" alt="twittwe icon"
				/></router-link>
			</div>
		</nav>
		<router-link to="/login" class="btn start-btn">Get noted</router-link>
		<div class="header-background"></div>
	</header>
</template>
<script>
export default {
	name: 'app-header',
	data() {
		return {
			isSticky: false,
		}
	},
	methods: {
		handleScroll() {
			if (window.scrollY >= 458) {
				this.isSticky = true
			} else {
				this.isSticky = false
			}
		},
	},
}
</script>
