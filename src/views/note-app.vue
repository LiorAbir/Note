<template>
	<section class="note-app">
		<appHeader />
		<noteList :notes="notes" />
	</section>
</template>

<script>
import appHeader from '../components/app-header.vue'
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
		appHeader,
		noteList,
	},
}
</script>

<style>
/* .note-app {
	background-color: lightgreen;
	padding: 5px;
} */
</style>
