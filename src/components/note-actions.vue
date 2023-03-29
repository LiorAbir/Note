<template>
	<!-- <pre>{{ note }}</pre> -->
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

		<!-- clrplt -->
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

		<!-- labels-->
		<div class="add-label-container">
			<button class="btn label-btn svg-btn" @click="onToggleLabels"></button>
			<!-- {{ noteCopy.labels }}
			{{ note.labels }} -->
			<transition name="msg">
				<div
					class="labels-list"
					v-if="isLabelModal"
					v-clickOutSide="onToggleLabels"
				>
					<h5 class="title">Notes labels</h5>
					<label class="flex" v-for="label in labels">
						<input
							type="checkbox"
							:value="label"
							v-model="noteCopy.labels"
							@change="onUpdateNoteLabels"
						/>
						<h5>{{ label }}</h5>
					</label>
				</div>
			</transition>
		</div>
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
		labels: Array,
		isClrPlt: Boolean,
		isLabelModal: Boolean,
	},
	data() {
		return {
			noteCopy: null,
			noteLabels: [],
			// isLabelModal: false,
			// isClrPlt: false,
		}
	},
	created() {
		this.noteCopy = JSON.parse(JSON.stringify(this.note))
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
			const noteCopy = JSON.parse(JSON.stringify(this.note))
			noteCopy.info.imgs.push(url)
			this.save(noteCopy)
		},
		onCopyNote() {
			const noteToCopy = JSON.parse(JSON.stringify(this.note))
			noteToCopy._id = ''
			this.save(noteToCopy)
		},
		onUpdateNoteLabels() {
			// const noteCopy = JSON.parse(JSON.stringify(this.note))
			// noteCopy.labels = this.noteLabels
			this.save(this.noteCopy)
		},
		setBackground(fill, type) {
			const noteCopy = JSON.parse(JSON.stringify(this.note))
			noteCopy[type] = fill
			this.save(noteCopy)
		},
		onToggleClrPlt() {
			this.$emit('toggleModal', 'color')
		},
		onToggleLabels() {
			this.$emit('toggleModal', 'label')
		},
		save(note) {
			this.$emit('save', note)
			this.noteCopy = JSON.parse(JSON.stringify(this.note))
		},
	},
	components: {
		addImg,
		backgroundPallete,
	},
}
</script>
