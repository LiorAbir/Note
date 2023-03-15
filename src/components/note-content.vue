<template>
	<div
		class="note-content"
		:style="{
			'background-image': `url(${note.bgImg})`,
		}"
		v-if="note"
	>
		<div class="note-imgs" v-if="note.info.imgs">
			<div class="img-container" v-for="(img, i) in note.info.imgs">
				<img :src="img" alt="upload" />
				<img
					class="delete-img-btn"
					src="../assets/icon/trash.svg"
					alt="trash"
					title="Delete image"
					@click="deleteImg(i)"
				/>
			</div>
		</div>

		<div
			class="note-title"
			contenteditable="true"
			@input="updateNoteTitle"
			placeholder="Title.."
		>
			{{ note.info.title }}
		</div>

		<!-- <pre>{{ note.info }}</pre> -->
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
		<!-- {{ note.info.txt }} -->

		<!-- <div v-if="note.type === 'txt'" class="main-content">
			<pre class="txt" contenteditable="true" @input="updateNoteInfo">
			{{ note.info.txt }}
			</pre
			>
		</div> -->

		<div v-else class="main-content list">
			<div v-for="(item, i) in note.info.list" class="item-container flex">
				<input type="checkbox" v-model="note.info.list[i].isChecked" />
				<input type="text" v-model="note.info.list[i].txt" />
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
		updateNoteInfo(el) {
			const noteCopy = JSON.parse(JSON.stringify(this.note))
			// noteCopy.info.txt = el.target.innerText
			noteCopy.info.txt = el.target.value
			// this.note.info.txt = el.target.innerText
			this.updateNote(noteCopy)
		},
		updateNoteTitle(el) {
			const noteCopy = JSON.parse(JSON.stringify(this.note))
			noteCopy.info.title = el.target.innerText
			this.updateNote(noteCopy)
		},
		deleteImg(idx) {
			const noteCopy = JSON.parse(JSON.stringify(this.note))
			noteCopy.info.imgs.splice(idx, 1)
			// this.note.info.imgs.splice(idx, 1)
			this.updateNote(noteCopy)
		},
		updateNote(note) {
			this.$emit('save', JSON.parse(JSON.stringify(note)))
			// this.$emit('save', note)
		},
	},
}
</script>
