<template>
	<section class="note-app flex">
		<listHeader @setFilterBy="setFilterBy" @toggleMenu="toggleMenu" />
		<div class="content-container flex">
			<sideNav
				@changePage="changePage"
				:isMenuOpen="isMenuOpen"
				:chosenPage="pageType"
			/>

			<div class="notes-content" v-if="notes">
				<noteAdd />
				<component
					:is="pageType"
					:notes="notes"
					class="notes-container"
					@deleteNote="deleteNote"
					@save="save"
				></component>
				<!-- <noteList :notes="notes" @removeNote="removeNote" @save="save" /> -->
			</div>
			<pre>

				{{ board }}
			</pre
			>
		</div>
	</section>
	<div v-if="isShowModal" class="modal-background">
		<router-view></router-view>
		<labelsModal
			v-if="isLabelModal"
			:labels="board.labels"
			@closeLabelModal="closeLabelModal"
			@updateLabels="updateLabels"
		/>
	</div>
</template>

<script>
import listHeader from '../components/list-header.vue'
import noteList from '../components/note-list.vue'
import sideNav from '../components/side-nav.vue'
import noteAdd from './note-add.vue'
import labelsModal from '../components/labels-modal.vue'

//Dynamic
import notes from '../components/dynamic-pages/notes.vue'
import archive from '../components/dynamic-pages/archive.vue'
import trash from '../components/dynamic-pages/trash.vue'

export default {
	name: 'note-app',
	data() {
		return {
			isMenuOpen: false,
			isShowModal: false,
			loggedInUser: null,
			pageType: 'notes',
			isLabelModal: false,
		}
	},
	async created() {
		this.loadUser()
		const { type } = this.$route.params
		this.pageType = type
	},
	methods: {
		async loadUser() {
			await this.$store.dispatch({ type: 'loadLoggedInUser' })
			this.loggedInUser = this.$store.getters.loggedInUser

			if (this.loggedInUser) {
				await this.$store.dispatch({ type: 'loadBoard' })
			} else {
				this.$router.push('/login')
				window.alert('Login first')
			}
		},
		deleteNote(id) {
			this.$store.dispatch({ type: 'removeNote', id })
		},
		setFilterBy(filterBy) {
			filterBy = JSON.parse(JSON.stringify(filterBy))
			this.$store.commit({ type: 'setFilter', filterBy })
			// this.$store.dispatch({ type: 'setFilterBy', filterBy: copyFilter })
		},
		save(note) {
			this.$store.dispatch({ type: 'saveNote', note })
		},
		changePage(page) {
			if (page === 'edit labels') {
				this.isShowModal = true
				this.isLabelModal = true
			} else {
				this.$router.push(`/${page}`)
				this.pageType = page
			}
		},
		toggleMenu() {
			this.isMenuOpen = !this.isMenuOpen
		},
		closeLabelModal() {
			this.isShowModal = false
			this.isLabelModal = false
			this.changePage(this.pageType)
		},
		updateLabels(labels) {
			// console.log(this.board)
			const boardCopy = JSON.parse(JSON.stringify(this.board))
			boardCopy.labels = labels
			// console.log(boardCopy)
			this.$store.dispatch({ type: 'saveBoard', board: boardCopy })
		},
	},
	computed: {
		notes() {
			return this.$store.getters.notesToDisplay
		},
		board() {
			return this.$store.getters.board
		},
	},
	watch: {
		$route: {
			immediate: true,
			handler: function (newVal, oldVal) {
				this.isShowModal = newVal.meta && newVal.meta.isShowModal
			},
		},
	},
	components: {
		listHeader,
		noteList,
		noteAdd,
		sideNav,
		archive,
		notes,
		trash,
		labelsModal,
	},
}
</script>
