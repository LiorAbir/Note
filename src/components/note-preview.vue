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
		<label class="btn select-btn" :class="{ show: isSelected || hover }">
			<img src="../assets/icon/vmark.svg" alt="" />
			<input type="checkbox" v-model="isSelected" @change="onSelectNote()" />
		</label>

		<noteContent
			:note="note"
			:textBoxType="'preview'"
			@save="save"
			@goToDetails="goToDetails"
		/>

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
import { eventBus } from '../services/eventBus-service'
import noteActions from './note-actions.vue'
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
	},
	components: {
		noteActions,
		noteContent,
	},
}
</script>

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
