<template>
	<section class="note-app flex">
		<listHeader @setFilterBy="setFilterBy" @toggleMenu="toggleMenu" />
		<div class="content-container flex">
			<sideNav @changePage="changePage" :isMenuOpen="isMenuOpen" />

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
		</div>
		<div class="edit-labels modal">
			{{ noteInfo.labels }}
			<div class="content">
				<h3 class="title">Edit labels</h3>
				<div class="add-label flex" :class="{ active: isInputFocus }">
					<button
						class="xmark-btn svg-btn"
						@click="isInputFocus = !isInputFocus"
					></button>
					<input
						type="text"
						placeholder="Add new label"
						@focus="isInputFocus = true"
						v-model="newLabel"
					/>
					<button class="add-btn svg-btn" @click="onAddLabel"></button>
				</div>
				<div class="labels-container"></div>
			</div>

			<div class="btns-container flex">
				<button class="btn">Done</button>
			</div>
		</div>
	</section>
	<div v-if="showModal" class="modal-background">
		<!-- <div class="modal-content"> -->
		<router-view></router-view>

		<!-- </div> -->
	</div>
</template>

<script>
import listHeader from '../components/list-header.vue'
import noteList from '../components/note-list.vue'
import sideNav from '../components/side-nav.vue'
import noteAdd from './note-add.vue'

//Dynamic
import notes from '../components/dynamic-pages/notes.vue'
import archive from '../components/dynamic-pages/archive.vue'
import trash from '../components/dynamic-pages/trash.vue'

export default {
	name: 'note-app',
	data() {
		return {
			isMenuOpen: false,
			showModal: true,
			isInputFocus: false,
			loggedInUser: null,
			pageType: 'notes',
			newLabel: '',
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
				await this.$store.dispatch({
					type: 'loadNotes',
					pageType: this.pageType,
				})
				// await this.$store.getters.notesToDisplay
			} else {
				this.$router.push('/login')
				window.alert('Login first')
			}
		},
		deleteNote(id) {
			this.$store.dispatch({ type: 'removeNote', id })
		},

		toggleModal() {
			this.showModal = !this.showModal
			this.$router.push(`/${this.page}`)
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
				console.log('Edit')
			} else {
				this.$router.push(`/${page}`)
				this.pageType = page
			}
		},
		toggleMenu() {
			this.isMenuOpen = !this.isMenuOpen
		},
		onAddLabel() {
			console.log(this.newLabel)
		},
	},
	computed: {
		notes() {
			return this.$store.getters.notesToDisplay
		},
		noteInfo() {
			return this.$store.getters.noteInfo
		},
	},
	watch: {
		$route: {
			immediate: true,
			handler: function (newVal, oldVal) {
				this.showModal = newVal.meta && newVal.meta.showModal
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
	},
}
</script>
