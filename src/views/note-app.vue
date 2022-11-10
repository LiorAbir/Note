<template>
	<section class="note-app">
		<appHeader />
		<noteList :notes="notes" @removeNote="removeNote" />
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
	methods: {
		removeNote(id) {
			this.$store.dispatch({ type: 'removeNote', id })
		},
	},
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
