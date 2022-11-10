<template>
	<div v-if="note" class="note-details">
		<h1>note-details</h1>
		<p>{{ note }}</p>
	</div>
</template>

<script>
import { noteService } from '../services/note-service.js'

export default {
	name: 'note-details',
	data() {
		return {
			note: null,
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
}
</script>
<style>
.note-details {
	padding: 5px;
	margin: 10px;
}
</style>
