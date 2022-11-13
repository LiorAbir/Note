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
			<div class="note-title">
				<h1>{{ note.info.title }}</h1>
			</div>
			<component
				:is="note.type"
				:info="note.info"
				class="note-content"
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
				<img
					src="../assets/icon/image.svg"
					alt="image"
					title="add image to note"
				/>
				<img src="../assets/icon/copy.svg" alt="copy" title="copy note" />
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
			const note = await noteService.getById(id)
			this.note = note
		} catch (err) {
			console.log('cannot find note')
		}
	},
	methods: {
		setBackground(fill, type) {
			// this.note[type] = fill
			// this.$store.dispatch({ type: 'saveNote', note: this.note })

			let editedNote = JSON.parse(JSON.stringify(this.note))
			editedNote[type] = fill
			this.$store.dispatch({ type: 'saveNote', note: editedNote })
		},
		closeModal() {
			if (this.isClrPlt === true) {
				return
			} else {
				this.$router.push('/note')
			}
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
