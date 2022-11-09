<template>
	<section class="note-preview">
		<div class="note-title">
			<h1>{{ note.info.title }}</h1>
		</div>

		<component :is="note.type" :info="note.info"></component>

		<div class="actions"></div>
	</section>
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
	methods: {},
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
