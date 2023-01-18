<template>
	<section class="note-app flex">
		<listHeader @setFilterBy="setFilterBy" />
		<div class="content-container flex">
			<sideNav @changePage="changePage" />
			<div class="notes-content" v-if="notes">
				<noteAdd />
				<noteList :notes="notes" @removeNote="removeNote" @save="save" />
			</div>
		</div>
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
import sideNav from '../components/side-nav.vue'
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
		this.loadUser()
		const { type } = this.$route.params
	},
	methods: {
		async loadUser() {
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
		changePage(page) {
			// this.$router.push()
			this.$router.push(`/${page}`)
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
		sideNav,
	},
}
</script>
