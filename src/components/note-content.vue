<template>
	<div
		class="note-content"
		v-if="note"
		@click="onGoToDetails"
		:style="{
			'background-image': `url(${note.bgImg})`,
		}"
	>
		<div class="note-imgs" v-if="note.info.imgs">
			<div class="img-container" v-for="(img, i) in note.info.imgs">
				<img :src="img" alt="upload" />
				<img
					class="delete-img-btn"
					src="../assets/icon/trash.svg"
					alt="trash"
					title="Delete image"
					@click="onDeleteImg(i)"
				/>
			</div>
		</div>

		<div
			class="note-title"
			contenteditable="true"
			@input="onUpdateNoteTitle"
			placeholder="Title.."
		>
			{{ note.info.title }}
		</div>

		<pre>{{ note.info }}</pre>
		<!-- <div
			v-if="note.type === 'txt'"
			class="main-content txt"
			contenteditable
			@input="updateNoteInfo"
		>
			{{ note.info.txt }}
		</div> -->
		<textarea
			v-if="note.type === 'txt'"
			class="main-content txt"
			placeholder="Note.."
			v-model="note.info.txt"
			@input="updateNoteInfo"
		>
		</textarea>

		<!-- <div v-if="note.type === 'txt'" class="main-content">
			<pre class="txt" contenteditable="true" @input="updateNoteInfo">
			{{ note.info.txt }}
			</pre
			>
		</div> -->

		<div v-else class="main-content list">
			<div v-for="(item, i) in noteCopy.info.list" class="item-container flex">
				<input
					type="checkbox"
					v-model="noteCopy.info.list[i].isChecked"
					@change="updateNote(noteCopy)"
				/>
				<input
					type="text"
					v-model="noteCopy.info.list[i].txt"
					@input="updateNote(noteCopy)"
				/>
			</div>
		</div>

		<div class="labels-container flex">
			<div class="label" v-for="label in note.labels">
				<p>{{ label }}</p>
				<!-- <button class="delete-btn svg-btn"></button> -->
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'note-content',
	props: {
		note: Object,
	},
	data() {
		return {
			noteCopy: null,
		}
	},
	created() {
		this.noteCopy = JSON.parse(JSON.stringify(this.note))
	},
	methods: {
		onGoToDetails(el) {
			console.log(el.target.childNodes)
			this.$emit('goToDetails')
		},
		onUpdateNoteInfo(el, type) {
			const noteCopy = JSON.parse(JSON.stringify(this.note))
			switch (type) {
				case 'txt':
					noteCopy.info.txt = el.target.value
					break
				case 'list':
					console.log(el.target.checked)
					break
			}
			this.updateNote(noteCopy)
		},
		onUpdateNoteTitle(el) {
			const noteCopy = JSON.parse(JSON.stringify(this.note))
			noteCopy.info.title = el.target.innerText
			this.updateNote(noteCopy)
		},
		onDeleteImg(idx) {
			const noteCopy = JSON.parse(JSON.stringify(this.note))
			noteCopy.info.imgs.splice(idx, 1)
			// this.note.info.imgs.splice(idx, 1)
			this.updateNote(noteCopy)
		},
		updateNote(note) {
			this.noteCopy = note
			this.$emit('save', JSON.parse(JSON.stringify(note)))
			// this.$emit('save', note)
		},
	},
}
</script>
