<template>
	<section class="note-app">
		<h1>note app</h1>
		{{ notes }}
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

<styly>
</styly>
