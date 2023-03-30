<template>
	<div
		class="note-details flex"
		v-if="note"
		v-clickOutSide="onCloseModal"
		:style="{
			backgroundColor: note.bgClr.clr,
			border: noteBorder,
		}"
	>
		<noteContent :note="note" :textBoxType="'details'" @save="save" />

		<div class="actions-container flex">
			<noteActions
				:note="note"
				:labels="board.labels"
				:isLabelModal="isLabelModal"
				:isClrPlt="isClrPlt"
				@toggleModal="toggleModal"
				@deletNote="deleteNote"
				@save="save"
			/>
			<!-- @setBackground="setBackground" -->
			<button class="btn close-btn" @click="onCloseModal">close</button>
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
			isLabelModal: false,
		}
	},
	async created() {
		const { id } = this.$route.params
		this.note = await this.$store.dispatch({ type: 'getById', id })
		// if (!id) {
		// 	this.$router.go(-1)
		// } else {
		// 	this.$router.push(`/NOTE/${id}`)
		// }
	},
	methods: {
		deleteNote(id) {
			this.$store.dispatch({ type: 'removeNote', id })
			this.$router.go(-1)
		},
		onCloseModal() {
			if (this.isClrPlt || this.isLabelModal) return
			this.$router.go(-1)
			// this.$router.push('/notes')
			eventBus.emit('updateOpacity', 1)
		},
		toggleModal(modalName) {
			if (modalName === 'color') {
				this.isClrPlt = !this.isClrPlt
			} else {
				this.isLabelModal = !this.isLabelModal
			}
		},
		closeClrPlt() {
			this.isClrPlt = false
		},
		save(note) {
			this.note = note
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
		board() {
			return this.$store.getters.board
		},
	},
	components: {
		noteActions,
		noteContent,
	},
}
</script>
<!-- updateNote() {
	this.$store.dispatch({ type: 'save', note: this.note })
}, -->
<!-- deleteImg(index) {
	this.note.info.imgs.splice(index, 1)
	let editedNote = JSON.parse(JSON.stringify(this.note))
	this.save(editedNote)
}, -->
<!-- addImgUrl(url) {
	this.note.info.imgs.push(url)
	let editedNote = JSON.parse(JSON.stringify(this.note))
	this.save(editedNote)
}, -->
<!-- // setBackground(fill, type) { // this.note[type] = fill // let editedNote =
	JSON.parse(JSON.stringify(this.note)) // this.save(editedNote) // }, -->

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
