<template>
	<div class="archive note-list">
		<div class="no-notes" v-if="!notes || !notes.length">
			<img src="../../assets/icon/archive-in.svg" alt="" />
			<h1>No Notes In Archivs</h1>
		</div>
		<ul class="clean-list" ref="grid" v-else>
			<li class="note-container" v-for="note in notes" :key="note._id">
				<!-- @toggleModal="toggleModal" -->
				<notePreview
					:note="note"
					:labels="labels"
					@save="save"
					@updateSelectedNotes="updateSelectedNotes"
				/>
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
		notes: Array,
		labels: Array,
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
		save(note) {
			this.$emit('save', note)
		},
		updateSelectedNotes(selectedNotes, isSelected) {
			this.$emit('updateSelectedNotes', selectedNotes, isSelected)
		},
	},
	components: {
		notePreview,
	},
}
</script>

<!-- removeNote(id) {
	this.$emit('removeNote', id)
}, -->
