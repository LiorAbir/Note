<template>
	<section class="note-app flex">
		<listHeader @setFilterBy="setFilterBy" @toggleMenu="toggleMenu" />
		<div class="content-container flex">
			<sideNav
				@changePage="changePage"
				:isMenuOpen="isMenuOpen"
				:chosenPage="pageType"
				@close="closeSideNav"
			/>

			<div class="notes-content" v-if="notes">
				<noteAdd />

				<component
					:is="pageType"
					:notes="notes"
					class="notes-container"
					@save="saveNote"
					@deleteNote="deleteNote"
					@updateNotesOrder="updateNotesOrder"
				></component>
				<!-- <noteList :notes="notes" @removeNote="removeNote" @save="save" /> -->
			</div>
			<!-- <button @click="tryy">Try</button> -->
			<!-- <pre>{{ board }}</pre> -->
		</div>
	</section>
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
			pageType: 'notes',
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

			// if (this.loggedInUser) {
			// } else {
			// 	this.$router.push('/login')
			// 	window.alert('Login first')
			// }
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
			if (page === 'edit labels') {
				this.isShowModal = true
				this.isLabelModal = true
			} else {
				this.$router.push(`/${page}`)
				this.pageType = page
				this.isShowModal = false
			}
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
	},
	watch: {
		$route: {
			immediate: true,
			handler: function (newVal, oldVal) {
				if (newVal.meta && newVal.meta.isShowModal) {
					this.isShowModal = newVal.meta && newVal.meta.isShowModal
				}
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
