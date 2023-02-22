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
					@addNoteToSelected="addNoteToSelected"
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
	data() {
		return {
			selectedNotes: [],
		}
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
		addNoteToSelected(note, isSelected) {
			if (isSelected) {
				this.selectedNotes.push(note)
			} else {
				const idx = this.selectedNotes.filter((n) => {
					return n._id === note._id
				})
				this.selectedNotes.splice(idx, 1)
			}

			this.$emit('updateSelectedNotes', this.selectedNotes)
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
