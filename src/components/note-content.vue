<template>
	<div
		class="note-content"
		:style="{
			'background-image': `url(${noteToEdit.bgImg})`,
		}"
		v-if="noteToEdit"
	>
		<div class="note-imgs" v-if="noteToEdit.info.imgs">
			<div class="img-container" v-for="(img, i) in noteToEdit.info.imgs">
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
		<input
			type="text"
			class="note-title"
			v-model="noteToEdit.info.title"
			placeholder="Add title"
			@input="updateNote"
		/>

		<div class="main-content" contenteditable="true" @input="updateNoteInfo">
			{{ noteToEdit.info.txt }}
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
			noteToEdit: null,
		}
	},
	created() {
		this.noteToEdit = this.note
	},
	methods: {
		updateNoteInfo(el) {
			this.noteToEdit.info.txt = el.target.innerText
			this.updateNote()
		},
		updateNote() {
			this.$emit('save', this.noteToEdit)
		},
	},
}
</script>
