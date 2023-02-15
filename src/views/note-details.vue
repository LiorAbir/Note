<template>
	<div
		class="note-details flex"
		v-if="note"
		v-clickOutSide="closeModal"
		:style="{
			backgroundColor: note.bgClr,
			border: noteBorder,
		}"
	>
		<noteContent :note="note" @save="save" />

		<div class="actions-container flex">
			<noteActions
				:note="note"
				:isClrPlt="isClrPlt"
				@deletNote="deleteNote"
				@toggleClrPlt="toggleClrPlt"
				@setBackground="setBackground"
				@save="save"
			/>
			<button class="btn close-btn" @click="closeModal">close</button>
		</div>
	</div>
</template>

<script>
import noteContent from '../components/note-content.vue'
import noteActions from '../components/note-actions.vue'
import { eventBus } from '../services/eventBus-service'

export default {
	name: 'note-details',
	data() {
		return {
			note: null,
			isClrPlt: false,
		}
	},
	async created() {
		const { id } = this.$route.params
		const currNote = await this.$store.dispatch({ type: 'getById', id })
		this.note = JSON.parse(JSON.stringify(currNote))
	},
	methods: {
		deleteNote(id) {
			this.$store.dispatch({ type: 'removeNote', id })
		},
		updateNote() {
			this.$store.dispatch({ type: 'save', note: this.note })
		},
		toggleClrPlt() {
			this.isClrPlt = !this.isClrPlt
		},
		setBackground(fill, type) {
			console.log('Set', fill, type)
			this.note[type] = fill
			let editedNote = JSON.parse(JSON.stringify(this.note))
			this.save(editedNote)
		},
		closeModal() {
			if (this.isClrPlt) return
			this.$router.push('/notes')
			eventBus.emit('updateOpacity', 1)
		},
		closeClrPlt() {
			this.isClrPlt = false
		},
		deleteImg(index) {
			this.note.info.imgs.splice(index, 1)
			let editedNote = JSON.parse(JSON.stringify(this.note))
			this.save(editedNote)
		},
		addImgUrl(url) {
			this.note.info.imgs.push(url)
			let editedNote = JSON.parse(JSON.stringify(this.note))
			this.save(editedNote)
		},
		save(note) {
			this.$store.dispatch({ type: 'saveNote', note })
		},
	},
	computed: {
		noteBorder() {
			if (this.note.bgClr === '#ffffff') {
				return '1px solid rgb(0 0 0 / 13%)'
			} else {
				return `1px solid ${this.note.bgClr}70`
			}
		},
	},
	components: {
		noteActions,
		noteContent,
	},
}
</script>

<!-- <div
	class="content-container"
	:style="{
		'background-image': `url(${note.bgImg})`,
	}"
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

	<div class="note-title">
		<input
			type="text"
			v-model="note.info.title"
			placeholder="Add title"
			@input="updateNote"
		/>
	</div> -->

<!-- <component
		:is="note.type"
		:info="note.info"
		class="note-content"
		@updateNote="updateNote"
		></component> -->
<!-- </div> -->
