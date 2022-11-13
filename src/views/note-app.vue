<template>
	<section class="note-app">
		<appHeader />
		<note-add />
		<noteList :notes="notes" @removeNote="removeNote" />
	</section>
	<div v-if="showModal" class="modal-background">
		<div class="modal-content">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
import appHeader from '../components/app-header.vue'
import noteList from '../components/note-list.vue'
import noteAdd from './note-add.vue'

export default {
	name: 'note-app',
	data() {
		return {
			showModal: false,
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
	},
	computed: {
		notes() {
			return this.$store.getters.notesToDisplay
		},
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
		appHeader,
		noteList,
		noteAdd,
	},
}
</script>

<style>
.modal-background {
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	background: rgb(0 0 0 / 46%);
	z-index: 2000;
}

.modal-content {
	width: 50%;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background: white;
	border-radius: 8px;
}
</style>
