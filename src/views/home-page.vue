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
	</section>
</template>
<script>
import appHeader from '../components/app-header.vue'
export default {
	name: 'home-page',
	data() {
		return {
			opacityNum: 1,
			prevScroll: 0,
		}
	},
	components: {
		appHeader,
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
}
</script>
<style></style>
