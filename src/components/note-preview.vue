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
		<div @click="goToDetails" :style="{}">
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
			<img
				src="../assets/icon/image.svg"
				alt="image"
				title="add image to note"
			/>
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

export default {
	name: 'note-preview',
	props: {
		note: Object,
	},
	data() {
		return {
			hover: false,
			isClrPlt: false,
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
