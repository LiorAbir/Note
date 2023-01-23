<template>
	<div
		v-if="note"
		v-clickOutSide="closeModal"
		class="note-details"
		:style="{
			backgroundColor: note.bgClr,
			border: noteBorder,
		}"
	>
		<div
			class="content"
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
				<input type="text" v-model="note.info.title" @input="updateNote" />
			</div>

			<component
				:is="note.type"
				:info="note.info"
				class="note-content"
			></component>
			<!-- @updateNote="updateNote" -->
		</div>

		<div class="actions-container flex">
			<noteActions
				:note="note"
				@deletNote="deleteNote"
				@toggleClrPlt="toggleClrPlt"
				@save="save"
			/>
			<button class="btn close-btn">close</button>
		</div>
		<backgroundPallete v-if="isClrPlt" @setBackground="setBackground" />
	</div>
</template>

<script>
import { noteService } from '../services/note-service.js'
import noteTodos from '../components/dynamic/note-todos.vue'
import noteTxt from '../components/dynamic/note-txt.vue'
import backgroundPallete from '../components/background-pallete.vue'
import addImg from '../components/add-img.vue'
import noteActions from '../components/note-actions.vue'

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
		try {
			const currNote = await noteService.getById(id)
			this.note = JSON.parse(JSON.stringify(currNote))
		} catch (err) {
			console.log('cannot find note')
		}
	},
	methods: {
		deleteNote(id) {
			this.$store.dispatch({ type: 'removeNote', id })
		},
		toggleClrPlt() {
			this.isClrPlt = !this.isClrPlt
		},
		setBackground(fill, type) {
			this.note[type] = fill
			let editedNote = JSON.parse(JSON.stringify(this.note))
			this.save(editedNote)
		},
		closeModal() {
			if (this.isClrPlt === true) {
				return
			} else {
				this.$router.push('/notes')
			}
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
		noteTodos,
		noteTxt,
		backgroundPallete,
		addImg,
		noteActions,
	},
}
</script>
<style></style>

<!-- <div class="actions-container flex">
	<img
		src="../assets/icon/pinned.svg"
		alt="pinned"
		class="btn pin-btn"
		@click="pinNote()"
	/>
	<div class="actions-container flex">
		<img
			src="../assets/icon/trash.svg"
			alt="trash"
			title="delete"
			@click="removeNote"
		/>
		<img
			src="../assets/icon/color.svg"
			alt="color"
			title="choose background color"
			@click="isClrPlt = !isClrPlt"
		/>
		<addImg @addImgUrl="addImgUrl" />
		<img
			src="../assets/icon/copy.svg"
			alt="copy"
			title="copy note"
			@click="copyNote"
		/>
	</div> -->
<!-- <button class="btn close-btn">Close</button>
</div> -->
