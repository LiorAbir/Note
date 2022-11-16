<template>
	<section class="note-list">
		<ul class="clean-list" ref="grid">
			<li class="note-container" v-for="note in notes" :key="note._id">
				<notePreview
					:note="note"
					@removeNote="removeNote"
					@copyNote="copyNote"
					@setBackground="setBackground"
				/>
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
	methods: {
		removeNote(id) {
			this.$emit('removeNote', id)
		},
		copyNote(note) {
			this.$emit('copyNote', note)
		},
		setBackground(note) {
			this.$emit('setBackground', note)
		},
	},
	components: {
		notePreview,
	},
}
</script>

<style></style>
