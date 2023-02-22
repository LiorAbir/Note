<template>
	<div
		class="note-content"
		:style="{
			'background-image': `url(${note.bgImg})`,
		}"
		v-if="note"
	>
		<div class="note-imgs" v-if="note.info.imgs">
			<div class="img-container" v-for="(img, i) in note.info.imgs">
				<img :src="img" alt="upload" />
				<img
					class="delete-img-btn"
					src="../assets/icon/trash.svg"
					alt="trash"
					title="Delete image"
					@click="deleteImg(i)"
				/>
			</div>
		</div>

		<div class="note-title" contenteditable="true" @input="updateNoteTitle">
			{{ note.info.title }}
		</div>

		<!-- v-model="noteCopy.info.title" -->
		<div class="main-content" contenteditable="true" @input="updateNoteInfo">
			{{ note.info.txt }}
		</div>

		<div class="labels-container flex">
			<div class="label" v-for="label in note.labels">
				<p>{{ label }}</p>
				<!-- <button class="delete-btn svg-btn"></button> -->
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'note-content',
	props: {
		note: Object,
	},
	data() {
		return {
			noteCopy: null,
		}
	},
	created() {
		this.noteCopy = JSON.parse(JSON.stringify(this.note))
	},
	methods: {
		updateNoteInfo(el) {
			const noteCopy = JSON.parse(JSON.stringify(this.note))
			noteCopy.info.txt = el.target.innerText
			// this.note.info.txt = el.target.innerText
			this.updateNote(noteCopy)
		},
		updateNoteTitle(el) {
			const noteCopy = JSON.parse(JSON.stringify(this.note))
			noteCopy.info.title = el.target.innerText
			this.updateNote(noteCopy)
		},
		deleteImg(idx) {
			const noteCopy = JSON.parse(JSON.stringify(this.note))
			noteCopy.info.imgs.splice(idx, 1)
			// this.note.info.imgs.splice(idx, 1)
			this.updateNote(noteCopy)
		},
		updateNote(note) {
			this.$emit('save', JSON.parse(JSON.stringify(note)))
			// this.$emit('save', note)
		},
	},
}
</script>
