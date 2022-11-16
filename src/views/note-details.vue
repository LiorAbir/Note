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
				@updateNote="updateNote"
			></component>
		</div>
		<div class="actions-container flex">
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
				<label>
					<img
						src="../assets/icon/image.svg"
						alt="image"
						title="add image to note"
					/>
					<input
						type="file"
						:style="{ display: 'none' }"
						@change="handleFile"
					/>
				</label>
				<img
					src="../assets/icon/copy.svg"
					alt="copy"
					title="copy note"
					@click="copyNote"
				/>
			</div>
			<button class="btn close-btn">Close</button>
		</div>
		<backgroundPallete v-if="isClrPlt" @setBackground="setBackground" />
	</div>
</template>

<script>
import { noteService } from '../services/note-service.js'
import noteTodos from '../components/dynamic/note-todos.vue'
import noteTxt from '../components/dynamic/note-txt.vue'
import backgroundPallete from '../components/background-pallete.vue'
import { uploadImg } from '../services/img-upload.service'

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
		setBackground(fill, type) {
			this.note[type] = fill
			let editedNote = JSON.parse(JSON.stringify(this.note))
			this.save(editedNote)
			// this.$store.dispatch({ type: 'saveNote', note: editedNote })
		},
		closeModal() {
			if (this.isClrPlt === true) {
				return
			} else {
				this.$router.push('/note')
			}
		},
		updateNote() {
			let editedNote = JSON.parse(JSON.stringify(this.note))
			this.save(editedNote)
			// this.$store.dispatch({ type: 'saveNote', note: editedNote })
		},
		copyNote() {
			console.log('copy')
			const noteToCopy = JSON.parse(JSON.stringify(this.note))
			noteToCopy._id = ''
			this.save(noteToCopy)
			// this.$store.dispatch({ type: 'saveNote', note: noteToCopy })
		},
		handleFile(ev) {
			const file = ev.target.files[0]
			this.uploadFile(file, this.note._id)
		},
		async uploadFile(file) {
			const res = await uploadImg(file)
			this.note.info.imgs.push(res.url)
			let editedNote = JSON.parse(JSON.stringify(this.note))
			// let noteCopy = JSON.parse(JSON.stringify(this.note))
			// noteCopy.info.imgs.push(res.url)
			this.save(editedNote)
		},
		deleteImg(index) {
			this.note.info.imgs.splice(index, 1)
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
	},
}
</script>
<style></style>
