<template>
	<section class="background-pallete">
		<div class="exp">Color</div>
		<div class="list">
			<div class="clr-pallete">
				<div
					class="color"
					v-for="clr in clrs"
					:key="clr"
					:style="{ backgroundColor: clr.clr }"
					:title="clr.name"
					@click="setBackground(clr, 'bgClr')"
				></div>
				<img
					src="../assets/icon/no-clr.svg"
					alt="ni color"
					class="empty"
					title="default"
					@click="
						setBackground({ name: 'default', clr: '#ffffff' }, 'bgClr')
					"
				/>
			</div>
		</div>
		<div class="exp">Background</div>
		<div class="list">
			<div class="img-pallete">
				<div
					v-for="img in imgs"
					:style="{
						'background-image': `url(${img})`,
					}"
					class="bg-img"
					@click="setBackground(img, 'bgImg')"
				></div>
				<img
					src="../assets/icon/eye-slash.svg"
					alt=""
					class="empty"
					title="default"
					@click="setBackground('', 'bgImg')"
				/>
			</div>
		</div>
	</section>
</template>
<script>
export default {
	name: 'background-pallete',
	data() {
		return {
			clrs: [
				{
					name: 'red',
					clr: '#f28b82',
				},
				{
					name: 'orange',
					clr: '#fbbc04',
				},
				{
					name: 'yellow',
					clr: '#fff475',
				},
				{
					name: 'green',
					clr: '#ccff90',
				},
				{
					name: '',
					clr: '#a7ffeb',
				},
				{
					name: 'ligthBlue',
					clr: '#cbf0f8',
				},
				{
					name: 'blue',
					clr: '#aecbfa',
				},
				{
					name: 'purple',
					clr: '#d7aefb',
				},
				{
					name: 'pink',
					clr: '#fdcfe8',
				},
				{
					name: 'brown',
					clr: '#e6c9a8',
				},
				{
					name: 'gray',
					clr: '#e8eaed',
				},
			],
		}
	},
	methods: {
		setBackground(fill, type) {
			this.$emit('setBackground', fill, type)
		},
	},
	computed: {
		imgs() {
			const imgs = []
			for (var i = 1; i < 10; i++) {
				let src = `./src/assets/background/background${i}.svg`
				imgs.push(src)
			}
			return imgs
		},
	},
}
</script>
<style></style>
