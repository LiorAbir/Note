<template>
	<div class="note-actions flex" v-if="note.location === 'trash'">
		<button class="btn delete-btn svg-btn" @click="onDeleteNote()"></button>
		<button
			class="btn restore-btn svg-btn"
			@click="onUpdateLocation('notes')"
		></button>
	</div>

	<div class="note-actions flex" v-else>
		<button class="btn pin-btn svg-btn" @click="onPinNote()"></button>
		<button
			class="btn trash-btn svg-btn"
			@click="onUpdateLocation('trash')"
		></button>

		<button
			v-if="note.location === 'archive'"
			class="btn out-archive-btn svg-btn"
			@click="onUpdateLocation('notes')"
		></button>
		<button
			v-else
			class="btn in-archive-btn svg-btn"
			@click="onUpdateLocation('archive')"
		></button>
		<addImg @addImgUrl="addImgUrl" />
		<div class="clr-btn-container">
			<button
				class="clr-btn svg-btn"
				title="choose background color"
				@click="onToggleClrPlt"
			></button>
			<transition name="msg">
				<backgroundPallete
					v-if="isClrPlt"
					@setBackground="setBackground"
					v-clickOutSide="onToggleClrPlt"
				/>
			</transition>
		</div>
		<button class="btn copy-btn svg-btn" @click="onCopyNote"></button>
	</div>
</template>
<script>
import addImg from './add-img.vue'
import backgroundPallete from './background-pallete.vue'
import { showUserMsg } from '../services/eventBus-service'

export default {
	name: 'note-actions',
	props: {
		note: Object,
		isClrPlt: Boolean,
	},
	data() {
		return {
			noteCopy: JSON.parse(JSON.stringify(this.note)),
		}
	},
	methods: {
		onDeleteNote() {
			this.$emit('deletNote', this.note._id)
		},
		onUpdateLocation(location) {
			this.noteCopy.location = location
			this.save(this.noteCopy)
			showUserMsg(`Note moved to ${location}`)
		},
		onPinNote() {
			this.noteCopy.isPinned = !this.note.isPinned
			this.save(this.noteCopy)
		},
		addImgUrl(url) {
			console.log(url)
			this.noteCopy.info.imgs.push(url)
			this.save(this.noteCopy)
		},
		onCopyNote() {
			const noteToCopy = JSON.parse(JSON.stringify(this.note))
			noteToCopy._id = ''
			this.save(noteToCopy)
		},
		onToggleClrPlt() {
			this.$emit('toggleClrPlt')
		},
		save(note) {
			this.$emit('save', note)
		},
		setBackground(fill, type) {
			this.$emit('setBackground', fill, type)
		},
	},
	components: {
		addImg,
		backgroundPallete,
	},
}
</script>
