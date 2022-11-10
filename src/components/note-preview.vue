<template>
	<!-- <router-link> -->
	<section
		class="note-preview"
		@mouseover="hover = true"
		@mouseleave="hover = false"
	>
		<div class="note-title">
			<h1>{{ note.info.title }}</h1>
		</div>

		<component :is="note.type" :info="note.info"></component>

		<div class="actions flex" :class="{ active: hover }">
			<button class="btn remove-btn" title="delete" @click="removeNote">
				remove
			</button>
			<button class="btn remove-btn" title="delete">Add pic</button>
			<button class="btn remove-btn" title="delete">Change clr</button>
		</div>
	</section>
	<!-- </router-link> -->
</template>

<script>
import noteTxt from './dynamic/note-txt.vue'
import noteImg from './dynamic/note-img.vue'
import noteTodos from './dynamic/note-todos.vue'
import noteVideo from './dynamic/note-video.vue'

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
	},
	computed: {},
	components: {
		noteTxt,
		noteTodos,
		noteImg,
		noteVideo,
	},
}
</script>

<style></style>
