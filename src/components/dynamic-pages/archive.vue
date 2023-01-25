<template>
	<div class="archive note-list">
		<div class="no-notes" v-if="!notes || !notes.length">
			<img src="../../assets/icon/archive-in.svg" alt="" />
			<h1>No Notes In Archivs</h1>
		</div>
		<ul class="clean-list" ref="grid" v-else>
			<li class="note-container" v-for="note in notes" :key="note._id">
				<notePreview :note="note" @save="save" />
				<div class="actions"></div>
			</li>
		</ul>
	</div>
</template>

<script>
import notePreview from '../note-preview.vue'
import Masonry from 'masonry-layout'

export default {
	name: 'archive',
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
		save(note) {
			this.$emit('save', note)
		},
	},
	components: {
		notePreview,
	},
}
</script>
