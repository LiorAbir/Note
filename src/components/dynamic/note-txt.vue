<template>
	<div class="note-txt-container">
		<div class="content" contenteditable="true" @input="updateNote">
			{{ info.txt }}
		</div>
	</div>
</template>

<script>
export default {
	props: {
		info: Object,
	},
	methods: {
		updateNote(el) {
			this.info.txt = el.target.innerText
			this.$emit('updateNote', this.info)
		},
	},
}
</script>

<style></style>
