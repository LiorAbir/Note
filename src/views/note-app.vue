<template>
	<section class="note-app flex">
		<listHeader
			@setFilterBy="setFilterBy"
			@toggleMenu="toggleMenu"
			:filter="filter"
		/>
		<div class="content-container flex">
			<sideNav
				@changePage="changePage"
				:isMenuOpen="isMenuOpen"
				:chosenPage="pageType"
				@close="closeSideNav"
			/>

			<div class="notes-content" v-if="notes">
				<noteAdd v-if="this.pageType === 'notes'" />
				<component
					:is="pageType"
					:notes="notes"
					:board="board"
					:filter="filter"
					class="notes-container"
					@save="saveNote"
					@deleteNote="deleteNote"
					@updateNotesOrder="updateNotesOrder"
					@setFilterBy="setFilterBy"
				></component>
				<!-- <noteList :notes="notes" @removeNote="removeNote" @save="save" /> -->
			</div>
			<!-- <noteFilter v-if="isFilterModal" /> -->
		</div>
	</section>

	<!-- MODAL -->
	<div v-if="isShowModal" class="modal-background" @click="closeSideNav()">
		<router-view v-slot="{ Component }">
			<transition name="grow-in">
				<component :is="Component" :key="$route.path"></component>
			</transition>
		</router-view>

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
import search from '../components/note-filter.vue'

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
			isLabelModal: false,
			isFilterModal: false,
			loggedInUser: null,
			pageType: 'noteFilter',
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
			await this.$store.dispatch({ type: 'loadBoard' })
		},
		deleteNote(id) {
			this.$store.dispatch({ type: 'removeNote', id })
		},
		setFilterBy(filterBy) {
			filterBy = JSON.parse(JSON.stringify(filterBy))
			this.$store.commit({ type: 'setFilter', filterBy })
			// this.$store.dispatch({ type: 'setFilterBy', filterBy: copyFilter })
		},
		saveNote(note) {
			this.$store.dispatch({ type: 'saveNote', note })
		},
		changePage(page) {
			this.closeSideNav()
			switch (page) {
				case 'edit labels':
					this.isShowModal = true
					this.isLabelModal = true
					break
				default:
					this.$router.push(`/${page}`)
					this.pageType = page
					this.isShowModal = false
					this.isFilterModal = false
					break
			}
			// if (page === 'edit labels') {
			// 	this.isShowModal = true
			// 	this.isLabelModal = true
			// } else {
			// 	this.$router.push(`/${page}`)
			// 	this.pageType = page
			// 	this.isShowModal = false
			// 	this.isFilterModal = false
			// }
		},
		toggleMenu() {
			this.isMenuOpen = !this.isMenuOpen
			if (window.innerWidth < 520) this.isShowModal = !this.isShowModal
		},
		closeLabelModal() {
			this.isShowModal = false
			this.isLabelModal = false
			this.changePage(this.pageType)
		},
		updateLabels(labels) {
			const boardCopy = JSON.parse(JSON.stringify(this.board))
			boardCopy.labels = labels
			this.$store.dispatch({ type: 'saveBoard', board: boardCopy })
		},
		updateNotesOrder(notes) {
			const boardCopy = JSON.parse(JSON.stringify(this.board))
			boardCopy.noteList = notes
			this.$store.dispatch({ type: 'saveBoard', board: boardCopy })
		},
		closeSideNav() {
			if (window.innerWidth > 520) return
			if (this.isMenuOpen) {
				this.isMenuOpen = false
				this.isShowModal = false
			}
		},
	},
	computed: {
		notes() {
			return this.$store.getters.notesToDisplay
		},
		board() {
			return this.$store.getters.board
		},
		filter() {
			return this.$store.getters.filterBy
		},
	},
	watch: {
		$route: {
			immediate: true,
			handler: function (newVal, oldVal) {
				console.log()
				if (newVal.meta && newVal.meta.isShowModal) {
					this.isShowModal = newVal.meta && newVal.meta.isShowModal
				}
			},
		},
	},

	// watch: {
	// 	'$route.params.type': {
	// 		handler(type) {
	// 			if (this.$route.params.id) return
	// 			if (type === 'search') return
	// 			this.filterBy.location = type
	// 			console.log(this.filterBy)
	// 			this.$emit('setFilterBy', this.filterBy)
	// 		},
	// 		immediate: true,
	// 	},
	// },
	components: {
		listHeader,
		noteList,
		noteAdd,
		sideNav,
		archive,
		notes,
		trash,
		labelsModal,
		search,
	},
}
</script>
