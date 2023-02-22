<template>
	<section class="note-app flex">
		<listHeader
			@setFilterBy="setFilterBy"
			@toggleMenu="toggleMenu"
			:filter="filter"
		/>
		{{ pageType }}
		{{ filter }}
		<div class="content-container flex">
			<sideNav
				:isMenuOpen="isMenuOpen"
				:chosenPage="pageType"
				:board="board"
				@changePage="changePage"
				@close="closeSideNav"
			/>
			<div class="notes-content" v-if="notes">
				<noteAdd
					v-if="
						this.pageType.mainCat === 'notes' &&
						this.pageType.subCat === ''
					"
				/>
				<component
					:is="pageType.mainCat"
					:notes="notes"
					:board="board"
					:labels="board.labels"
					:filter="filter"
					class="notes-container"
					@save="saveNote"
					@deleteNote="deleteNote"
					@setFilterBy="setFilterBy"
				></component>
				<!-- @updateNotesOrder="updateNotesOrder" -->
				<!-- <noteList :notes="notes" @removeNote="removeNote" @save="save" /> -->
			</div>
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
			@updateNotesLabels="updateNotesLabels"
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
			loggedInUser: null,
			pageType: {
				mainCat: '',
				subCat: '',
			},
		}
	},
	async created() {
		this.loadUser()
		const { type } = this.$route.params
		this.pageType.mainCat = type
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
		},
		saveNote(note) {
			this.$store.dispatch({ type: 'saveNote', note })
		},
		updateNotesLabels(label) {
			this.notes.map((note) => {
				if (note.labels.includes(label)) {
					let idx = note.labels.findIndex((l) => l === label)
					const noteCopy = JSON.parse(JSON.stringify(note))
					noteCopy.labels.splice(idx, 1)
					this.saveNote(noteCopy)
				}
			})
		},
		toggleMenu() {
			this.isMenuOpen = !this.isMenuOpen
			if (window.innerWidth < 520) this.isShowModal = !this.isShowModal
		},
		closeLabelModal() {
			this.isShowModal = false
			this.isLabelModal = false
			this.changePage(this.pageType.mainCat)
		},
		updateLabels(labels) {
			const boardCopy = JSON.parse(JSON.stringify(this.board))
			boardCopy.labels = labels
			this.$store.dispatch({ type: 'saveBoard', board: boardCopy })
		},
		closeSideNav() {
			if (window.innerWidth > 520) return
			if (this.isMenuOpen) {
				this.isMenuOpen = false
				this.isShowModal = false
			}
		},
		changePage(page, label) {
			this.closeSideNav()

			switch (page) {
				case 'edit labels':
					this.isShowModal = true
					this.isLabelModal = true
					break
				case 'label':
					this.$router.push(`/${page}/${label}`)

					this.pageType.mainCat = 'notes'
					this.pageType.subCat = label

					this.filter.location = ''
					this.filter.label = label
					this.setFilterBy(this.filter)

					this.isShowModal = false
					break
				case 'search':
					this.$router.push(`/${page}`)

					this.pageType.mainCat = page
					this.pageType.subCat = label

					this.filter.location = ''
					this.setFilterBy(this.filter)
					break

				default:
					this.$router.push(`/${page}`)

					this.pageType.mainCat = page
					this.pageType.subCat = label

					this.filter.location = page
					this.filter.label = label
					this.setFilterBy(this.filter)

					this.isShowModal = false
					break
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
				if (newVal.meta && newVal.meta.isShowModal) {
					this.isShowModal = newVal.meta && newVal.meta.isShowModal
				}

				if (newVal.params.id) return
				let { type, val } = newVal.params
				this.changePage(type, val)
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
		search,
	},
}
</script>

<!-- updateNotesOrder(notes) {
 	const boardCopy = JSON.parse(JSON.stringify(this.board))
 	boardCopy.noteList = notes
 	this.$store.dispatch({ type: 'saveBoard', board: boardCopy })
 }, -->
