<template>
	<section class="note-list">
		<ul class="clean-list" ref="grid">
			<li class="note-container" v-for="note in notes" :key="note._id">
				<notePreview :note="note" />
			</li>
		</ul>
	</section>
</template>

<script>
import notePreview from './note-preview.vue'
import Masonry from 'masonry-layout'

export default {
	name: 'note-list',
	props: {
		notes: {
			type: Array,
			requaired: true,
		},
	},
	mounted() {
		const gridEl = this.$refs.grid
		const masonry = new Masonry(gridEl, {
			itemSelector: '.note-preview',
			// getter: 10,
			fitWidth: true,
		})
	},
	components: {
		notePreview,
	},
}
</script>

<style></style>
