<template>
	<section class="background-pallete">
		<div class="clr-pallete flex">
			<div
				class="color"
				v-for="clr in clrs"
				:key="clr"
				:style="{ backgroundColor: clr }"
			></div>
			<img
				src="../assets/icon/no-clr.svg"
				alt="ni color"
				class="empty"
				title="default"
			/>
		</div>
		<div class="img-pallete">
			<img
				:src="img"
				v-for="img in imgs"
				alt="background image"
				class="bg-img"
			/>
			<img
				src="../assets/icon/eye-slash.svg"
				alt=""
				class="empty"
				title="default"
			/>
		</div>
	</section>
</template>
<script>
export default {
	name: 'background-pallete',
	data() {
		return {
			clrs: [
				'#f28b82',
				'#fbbc04',
				'#fff475',
				'#ccff90',
				'#a7ffeb',
				'#cbf0f8',
				'#aecbfa',
				'#d7aefb',
				'#fdcfe8',
				'#e6c9a8',
				'#e8eaed',
			],
		}
	},
	computed: {
		imgs() {
			const imgs = []
			for (var i = 1; i < 10; i++) {
				let src = `src/assets/background/background${i}.svg`
				imgs.push(src)
			}
			return imgs
		},
	},
}
</script>
<style></style>
