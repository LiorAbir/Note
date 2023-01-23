<template>
	<section class="note-list">
		<ul class="clean-list pinned-list" ref="grid2">
			<li
				class="pinned-note-container"
				v-for="note in pinnedNotes"
				:key="note._id"
			>
				<notePreview :note="note" @save="save" />
			</li>
		</ul>

		<ul class="clean-list" ref="grid">
			<li
				class="note-container"
				v-for="note in notPinnedNotes"
				:key="note._id"
			>
				<notePreview :note="note" @save="save" />
			</li>
		</ul>
	</section>
</template>

<script>
import notePreview from '../note-preview.vue'
import Masonry from 'masonry-layout'

export default {
	name: 'note-list',
	props: {
		notes: {
			type: Array,
			requaired: true,
			isPinnedNotes: false,
		},
	},
	mounted() {
		const gridEl = this.$refs.grid
		const masonry = new Masonry(gridEl, {
			itemSelector: '.note-preview',
			// getter: 10,
			fitWidth: true,
		})
		const gridEl2 = this.$refs.grid2
		const masonry2 = new Masonry(gridEl2, {
			itemSelector: '.note-preview',
			// getter: 10,
			fitWidth: true,
		})
	},
	methods: {
		save(note) {
			this.$emit('save', note)
		},
	},
	computed: {
		pinnedNotes() {
			const pinnedNotes = this.notes.filter((note) => {
				return note.isPinned === true
			})

			return pinnedNotes
		},
		notPinnedNotes() {
			const notPinnedNotes = this.notes.filter((note) => {
				return note.isPinned === false
			})
			return notPinnedNotes
		},
	},
	components: {
		notePreview,
	},
}
</script>
