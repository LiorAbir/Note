<template>
	<section class="note-list">
		<div class="no-notes" v-if="!notes || !notes.length">
			<img src="../../assets/icon/lightbulb.svg" alt="" />
			<h1>Notes you add appear here</h1>
		</div>

		<div class="notes" v-else>
			<!-- <ul class="clean-list pinned-list" ref="masonry">
				<li
					class="pinned-note-container"
					v-for="note in pinnedNotes"
					:key="note._id"
				>
					<notePreview :note="note" @save="save" />
				</li>
			</ul> -->

			<!-- <draggable
				v-model="notes"
				group="notes"
				item-key="id"
				tag="ul"
				class="clean-list masonry grid"
				drag-class="drag"
				ghost-class="ghost"
				@change="onChangeNote"
			>
				<template #item="{ element }">
					<li class="note-container item">
						<div>
							<notePreview :note="element" @save="save" />
						</div>
					</li>
				</template>
			</draggable> -->

			<ul class="clean-list masonry" ref="grid">
				<li
					class="note-container"
					v-for="note in notPinnedNotes"
					:key="note._id"
				>
					<notePreview :note="note" :board="board" @save="save" />
				</li>
			</ul>
		</div>
	</section>
</template>

<script>
import notePreview from '../note-preview.vue'
import draggable from 'vuedraggable'
import Masonry from 'masonry-layout'

export default {
	name: 'note-list',
	props: {
		notes: Array,
		board: Object,
	},
	mounted() {
		let elem = document.querySelector('.masonry')
		let masonry = new Masonry(elem, {
			itemSelector: '.note-preview',
			getter: 10,
			fitWidth: true,
		})
	},
	methods: {
		save(note) {
			this.$emit('save', note)
		},
		toggleModal() {
			this.$emit('toggleModal')
		},
		onChangeNote(ev) {
			let notesCopy = this.notes.slice()
			this.$emit('updateNotesOrder', notesCopy)
			// this.$emit('saveBoard')
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
		draggable,
	},
}
</script>
