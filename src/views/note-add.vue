<template>
	<div class="note-add" v-if="isFocus === false" @click="isFocus = true">
		<div class="add-container flex">
			<h4>Add note...</h4>
			<div class="types flex">
				<img
					src="../assets/icon/list.svg"
					alt="list"
					class="btn type-btn"
					title="list note"
					@click="setNoteType('note-todos')"
				/>
				<img
					src="../assets/icon/image.svg"
					alt="image"
					class="btn type-btn"
					title="note with image"
					@click="setNoteType('note-txt')"
				/>
			</div>
		</div>
	</div>
	<!--  -->
	<div class="note-add" v-if="isFocus" v-clickOutSide="closeAddNote">
		<div class="add-note-input">
			<div class="content-input flex">
				<input
					type="text"
					class="note-title"
					placeholder="Title"
					v-model="newNote.info.title"
				/>
				<div
					class="note-content"
					:placeholder="setInputPlaceHolder"
					contenteditable="true"
					@input="setVal"
				></div>
			</div>
			<div class="actions flex">
				<div class="flex">
					<img
						src="../assets/icon/image.svg"
						alt="image"
						class="btn img-btn"
						title="add image"
					/>
					<img
						src="../assets/icon/color.svg"
						alt="color"
						class="btn clr-btn"
						title="choose background"
					/>
				</div>
				<button @click="save">Save</button>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'note-add',
	data() {
		return {
			newNote: null,
			isFocus: false,
		}
	},
	created() {
		this.newNote = this.$store.getters.emptyNote
	},
	methods: {
		setNoteType(type) {
			this.newNote.type = type
		},
		setVal(el) {
			let val = el.target.innerText
			switch (this.newNote.type) {
				case 'note-txt':
					this.newNote.info = {
						txt: val,
					}
					break
				case 'note-todos':
					const todos = []
					console.log(val)
					val.split(',').map((todo) => {
						const newTodo = { txt: todo }
						todos.push(newTodo)
					})
					this.newNote.info = { todos: todos }
					break
			}
		},
		save() {
			this.$store.dispatch({ type: 'saveNote', note: this.newNote })
			this.closeAddNote()
		},
		closeAddNote() {
			this.isFocus = false
			this.newNote.type = 'note-txt'
		},
	},
	computed: {
		setInputPlaceHolder() {
			switch (this.newNote.type) {
				case 'note-txt':
					return "What's on your mind..."
					break
				case 'note-todos':
					return 'Enter comma separated list...'
					break
			}
		},
	},
}
</script>
<style></style>
