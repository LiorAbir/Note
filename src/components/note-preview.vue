<template>
	<section
		class="note-preview"
		@mouseover="hover = true"
		@mouseleave="hover = false"
		:style="{
			backgroundColor: note.bgClr,
			border: noteBorder,
			'background-image': `url(${note.bgImg})`,
		}"
	>
		<div @click="goToDetails">
			<div class="note-imgs" v-if="note.info.imgs">
				<img v-for="img in note.info.imgs" :src="img" alt="upload" />
			</div>

			<div class="note-title">
				<input type="text" v-model="note.info.title" />
			</div>

			<component
				:is="note.type"
				:info="note.info"
				class="note-content"
			></component>
		</div>

		<div class="actions flex" :class="{ active: hover }">
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
		<backgroundPallete
			v-if="isClrPlt"
			v-clickOutSide="closeClrPlt"
			@setBackground="setBackground"
		/>
	</section>
</template>

<script>
import noteTxt from './dynamic/note-txt.vue'
import noteImg from './dynamic/note-img.vue'
import noteTodos from './dynamic/note-todos.vue'
import noteVideo from './dynamic/note-video.vue'
import backgroundPallete from './background-pallete.vue'
import { uploadImg } from '../services/img-upload.service'

export default {
	name: 'note-preview',
	props: {
		note: Object,
	},
	data() {
		return {
			hover: false,
			isClrPlt: false,
			noteCopy: JSON.parse(JSON.stringify(this.note)),
		}
	},
	methods: {
		removeNote() {
			this.$emit('removeNote', this.note._id)
		},
		goToDetails() {
			this.$router.push(`/note/${this.note._id}`)
		},
		closeClrPlt() {
			this.isClrPlt = false
		},
		copyNote() {
			const noteToCopy = JSON.parse(JSON.stringify(this.note))
			noteToCopy._id = ''
			this.$emit('copyNote', noteToCopy)
		},
		setBackground(fill, type) {
			let editedNote = JSON.parse(JSON.stringify(this.note))
			editedNote[type] = fill
			this.$emit('setBackground', editedNote)
		},
		handleFile(ev) {
			const file = ev.target.files[0]
			this.uploadFile(file, this.note._id)
		},
		async uploadFile(file) {
			const res = await uploadImg(file)
			this.noteCopy.info.imgs.push(res.url)
			this.save(this.noteCopy)
		},
		save(note) {
			this.$emit('save', note)
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
		noteTxt,
		noteTodos,
		noteImg,
		noteVideo,
		backgroundPallete,
	},
}
</script>

<style></style>
