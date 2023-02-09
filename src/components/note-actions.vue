<template>
	<div class="note-actions flex" v-if="note.location === 'trash'">
		<button
			v-for="action in trashActions"
			class="btn svg-btn"
			:class="action.name"
			:style="{ backgroundImage: `url(${action.img})` }"
		></button>
		<!-- @click="action.func" -->
		<!-- <img
			src="../assets/icon/delete.svg"
			class="btn delet-btn"
			alt="delete"
			@click="onDeleteNote()"
		/>
		<img
			src="../assets/icon/restoration.svg"
			class="btn restoration-btn"
			alt="restoration"
			@click="onUpdateLocation('notes')"
		/> -->
	</div>

	<div class="note-actions flex" v-else>
		<img
			src="../assets/icon/pinned.svg"
			alt="pinned"
			class="btn pin-btn"
			@click="onPinNote()"
		/>
		<img
			src="../assets/icon/trash.svg"
			alt="trash"
			@click="onUpdateLocation('trash')"
		/>
		<img
			v-if="note.location === 'archive'"
			src="../assets/icon/archive-out.svg"
			alt="archive"
			class="btn archive-btn"
			@click="onUpdateLocation('notes')"
		/>
		<img
			v-else
			src="../assets/icon/archive-in.svg"
			alt="archive"
			class="btn archive-btn"
			@click="onUpdateLocation('archive')"
		/>
		<addImg @addImgUrl="addImgUrl" />
		<div class="clr-btn-container">
			<button
				class="clr-btn svg-btn"
				title="choose background color"
				@click="onToggleClrPlt"
			></button>
			<backgroundPallete
				v-if="isClrPlt"
				@setBackground="setBackground"
				v-clickOutSide="onToggleClrPlt"
			/>
		</div>
		<!-- <img
			src="../assets/icon/color.svg"
			alt="color"
			title="choose background color"
			@click="onToggleClrPlt"
			/> -->
		<img
			src="../assets/icon/copy.svg"
			alt="copy"
			title="copy note"
			@click="onCopyNote"
		/>
		<!-- {{ isClrPlt }} -->
	</div>
</template>
<script>
import addImg from './add-img.vue'
import backgroundPallete from './background-pallete.vue'

export default {
	name: 'note-actions',
	props: {
		note: Object,
		isClrPlt: Boolean,
	},
	data() {
		return {
			noteCopy: JSON.parse(JSON.stringify(this.note)),
			trashActions: [
				{
					name: 'delete-btn',
					img: '/src/assets/icon/delete.svg',
					// func: onUpdateLocation('notes'),
				},
				{
					name: 'restoration-btn',
					img: '/src/assets/icon/restoration.svg',
					func: 'onDeleteNote()',
				},
			],
			actions: [
				// {
				// 	name: 'pin-btn',
				// 	img: '../assets/icon/pinned.svg',
				// 	func: 'onPinNote',
				// },
			],
		}
	},
	methods: {
		onDeleteNote() {
			this.$emit('deletNote', this.note._id)
		},
		onUpdateLocation(location) {
			this.noteCopy.location = location
			this.save(this.noteCopy)
		},
		onPinNote() {
			this.noteCopy.isPinned = !this.note.isPinned
			this.save(this.noteCopy)
		},
		addImgUrl(url) {
			this.noteCopy.info.imgs.push(url)
			this.save(this.noteCopy)
		},
		onCopyNote() {
			const noteToCopy = JSON.parse(JSON.stringify(this.note))
			noteToCopy._id = ''
			this.save(noteToCopy)
		},
		onToggleClrPlt() {
			console.log(this.isClrPlt)
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
