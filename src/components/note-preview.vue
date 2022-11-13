<template>
	<section
		class="note-preview"
		@mouseover="hover = true"
		@mouseleave="hover = false"
	>
		<div @click="goToDetails">
			<div class="note-title">
				<h1>{{ note.info.title }}</h1>
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
			/>
			<img
				src="../assets/icon/image.svg"
				alt="image"
				title="add image to note"
			/>
			<img src="../assets/icon/copy.svg" alt="copy" title="copy note" />
		</div>
		<backgroundPallete />
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
		}
	},
	methods: {
		removeNote() {
			this.$emit('removeNote', this.note._id)
		},
		goToDetails() {
			this.$router.push(`/note/${this.note._id}`)
		},
	},
	computed: {},
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
