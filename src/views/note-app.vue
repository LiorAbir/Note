<template>
	<section class="note-app">
		<listHeader @setFilterBy="setFilterBy" />
		<note-add />
		<!-- <pre>{{ notes }}</pre> -->

		<!-- <button class="btn" @click="logout">logout</button> -->
		<!-- <div v-if="!notes || !notes.length" class="no-notes flex">
			<img src="../assets/img/add-note.svg" alt="" />
			<h1>Add note</h1>
		</div> -->
		<noteList :notes="notes" @removeNote="removeNote" @save="save" />
	</section>
	<div v-if="showModal" class="modal-background">
		<div class="modal-content">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
import listHeader from '../components/list-header.vue'
import noteList from '../components/note-list.vue'
import noteAdd from './note-add.vue'

export default {
	name: 'note-app',
	data() {
		return {
			showModal: false,
			loggedInUser: null,
			notes: null,
		}
	},
	async created() {
		await this.$store.dispatch({ type: 'loadLoggedInUser' })
		this.loggedInUser = this.$store.getters.loggedInUser

		if (this.loggedInUser) {
			await this.$store.dispatch({ type: 'loadNotes' })
			this.notes = await this.$store.getters.notes
		} else {
			this.$router.push('/login')
			window.alert('Login first')
		}
	},
	methods: {
		removeNote(id) {
			this.$store.dispatch({ type: 'removeNote', id })
		},

		toggleModal() {
			this.showModal = !this.showModal
			this.$router.push('/note')
		},
		setFilterBy(filterBy) {
			this.$store.dispatch({ type: 'setFilterBy', filterBy })
		},
		save(note) {
			this.$store.dispatch({ type: 'saveNote', note })
		},
	},
	computed: {
		// notes() {
		// 	return this.$store.getters.notesToDisplay
		// },
		goToNotes() {
			this.$router.push('/note')
		},
	},
	watch: {
		$route: {
			immediate: true,
			handler: function (newVal) {
				this.showModal = newVal.meta && newVal.meta.showModal
			},
		},
	},
	components: {
		listHeader,
		noteList,
		noteAdd,
	},
}
</script>
