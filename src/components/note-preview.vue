<!-- 'background-image': `url(${note.bgImg})`, -->
<template>
	<section
		class="note-preview"
		@mouseover="hover = true"
		@mouseleave="hover = false"
		:class="{ selected: isSelected, hover: hover }"
		:style="{
			backgroundColor: note.bgClr.clr,
			opacity: opacityStyle,
		}"
	>
		{{ noteCopy }}
		<label class="btn select-btn" :class="{ show: isSelected || hover }">
			<img src="../assets/icon/vmark.svg" alt="" />
			<input type="checkbox" v-model="isSelected" @change="onSelectNote()" />
		</label>

		<noteContent :note="note" @save="save" @goToDetails="goToDetails" />

		<noteActions
			:class="{ hover: hover || isClrPlt || isLabelModal }"
			:note="note"
			:labels="labels"
			:isLabelModal="isLabelModal"
			:isClrPlt="isClrPlt"
			@toggleModal="toggleModal"
			@deletNote="deleteNote"
			@save="save"
		/>
	</section>
</template>

<script>
// import noteTxt from './dynamic/note-txt.vue'
// import noteImg from './dynamic/note-img.vue'
// import noteTodos from './dynamic/note-todos.vue'
// import noteVideo from './dynamic/note-video.vue'
import backgroundPallete from './background-pallete.vue'
import addImg from './add-img.vue'
import noteActions from './note-actions.vue'
import { eventBus } from '../services/eventBus-service'
import noteContent from './note-content.vue'

export default {
	name: 'note-preview',
	props: {
		note: Object,
		labels: Array,
		selectedNotes: Array,
	},
	data() {
		return {
			// noteCopy: null,
			hover: false,
			opacityStyle: 1,
			isSelected: false,
			isClrPlt: false,
			isLabelModal: false,
			//
			isLoading: false,
		}
	},
	mounted() {
		this.opacityStyle = 1
		eventBus.on('updateOpacity', () => {
			this.opacityStyle = 1
		})
	},
	// created() {
	// 	this.noteCopy = JSON.parse(JSON.stringify(this.note))
	// },
	methods: {
		deleteNote(id) {
			this.$emit('deleteNote', id)
		},
		toggleModal(modalName) {
			if (modalName === 'color') {
				this.isClrPlt = !this.isClrPlt
			} else {
				this.isLabelModal = !this.isLabelModal
			}
		},
		goToDetails() {
			this.opacityStyle = 0
			this.$router.push(`/NOTE/${this.note._id}`)
		},
		save(note) {
			// this.noteCopy = note
			this.$emit('save', note)
		},
		onSelectNote() {
			this.$emit('updateSelectedNotes', this.note, this.isSelected)
		},
		// setIsLoading(boolean) {
		// 	this.isLoading === boolean
		// },
	},
	computed: {
		noteBorder() {
			if (this.note.bgClr === '#ffffff') {
				return '1px solid rgb(0 0 0 / 13%)'
			} else {
				return `1px solid ${this.note.bgClr}70`
			}
		},
		noteCopy() {
			return JSON.parse(JSON.stringify(this.note))
		},
	},
	components: {
		backgroundPallete,
		addImg,
		noteActions,
		noteContent,
	},
}
</script>

<style></style>

<!-- <div v-if="!isLoading"> -->
<!-- <div class="note-imgs" v-if="note.info.imgs">
	<img
		v-for="img in note.info.imgs"
		:key="img"
		:src="img"
		alt="upload"
	/>
</div> -->
<!-- </div> -->
<!-- 
<div v-else>
	<h1>loading</h1>
</div> -->
<!-- <input class="note-title" type="text" v-model="note.info.title" />

<component
	:is="note.type"
	:info="note.info"
	class="note-content"
></component> -->
