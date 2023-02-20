<template>
	<section
		class="note-preview"
		@mouseover="hover = true"
		@mouseleave="hover = false"
		:style="{
			backgroundColor: note.bgClr,
			border: noteBorder,
			'background-image': `url(${note.bgImg})`,
			opacity: opacityStyle,
		}"
	>
		<div @click="goToDetails">
			<noteContent :note="note" @save="save" />
		</div>
		<noteActions
			:note="note"
			:labels="labels"
			@deletNote="deleteNote"
			@toggleClrPlt="toggleClrPlt"
			@save="save"
		/>
		<backgroundPallete
			v-if="isClrPlt"
			v-clickOutSide="closeClrPlt"
			@setBackground="setBackground"
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
	},
	data() {
		return {
			hover: false,
			isClrPlt: false,
			noteCopy: JSON.parse(JSON.stringify(this.note)),
			isLoading: false,
			opacityStyle: 1,
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
		goToDetails() {
			this.opacityStyle = 0
			this.$router.push(`/NOTE/${this.note._id}`)
		},
		closeClrPlt() {
			this.isClrPlt = false
		},
		setBackground(fill, type) {
			let editedNote = JSON.parse(JSON.stringify(this.note))
			editedNote[type] = fill
			this.save(editedNote)
		},
		save(note) {
			this.$emit('save', note)
		},
		toggleClrPlt() {
			this.isClrPlt = !this.isClrPlt
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
