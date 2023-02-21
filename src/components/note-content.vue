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
		<input
			type="text"
			class="note-title"
			v-model="note.info.title"
			placeholder="Add title"
			@input="updateNote"
		/>

		<div class="main-content" contenteditable="true" @input="updateNoteInfo">
			{{ note.info.txt }}
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
	methods: {
		updateNoteInfo(el) {
			this.note.info.txt = el.target.innerText
			this.updateNote()
		},
		deleteImg(idx) {
			this.note.info.imgs.splice(idx, 1)
			this.updateNote()
		},
		updateNote() {
			this.$emit('save', JSON.parse(JSON.stringify(this.note)))
		},
	},
}
</script>
