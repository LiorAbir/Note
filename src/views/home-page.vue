<template>
	<section class="home-page">
		<appHeader />
		<div class="hero">
			<div
				class="content flex"
				v-scroll="handleScroll"
				:style="{ opacity: opacityNum }"
			>
				<h2 class="title">Save your thoughts, wherever you are</h2>
				<router-link to="/login" class="start-btn">
					Try Noted .
				</router-link>
			</div>
		</div>
		<div class="content capture flex">
			<h2 class="title">Capture what's on your mind</h2>
			<p class="sub-title">Add notes, lists, and photos to keep.</p>
			<div class="container flex">
				<div class="notes flex">
					<div class="img"></div>
					<div class="sub-img"></div>
				</div>
				<div class="lists flex">
					<div class="img"></div>
					<div class="sub-img"></div>
				</div>
			</div>
		</div>
		<appFooter />
	</section>
</template>
<script>
import appHeader from '../components/app-header.vue'
import appFooter from '../components/app-footer.vue'
export default {
	name: 'home-page',
	data() {
		return {
			opacityNum: 1,
			prevScroll: 0,
		}
	},
	methods: {
		handleScroll() {
			const st = window.scrollY

			if (st > this.prevScroll) {
				this.opacityNum -= 0.02
			} else {
				this.opacityNum += 0.01
			}

			if (window.scrollY === 0) this.opacityNum = 1

			this.prevScroll = st <= 0 ? 0 : st
		},
	},
	components: {
		appHeader,
		appFooter,
	},
}
</script>
