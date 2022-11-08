<template>
	<section class="note-app">
		<h1>note app</h1>
		<noteList :notes="notes" />
	</section>
</template>

<script>
import noteList from '../components/note-list.vue'

export default {
	name: 'note-app',
	data() {
		return {}
	},
	methods: {},
	computed: {
		notes() {
			return this.$store.getters.notesToDisplay
		},
	},
	components: {
		noteList,
	},
}
</script>

<style>
.note-app {
	background-color: lightgreen;
	padding: 5px;
}
</style>
