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

		<input
			class="note-title"
			v-model="note.info.title"
			placeholder="Title.."
			@input="updateNote(note)"
		/>
		<textarea
			v-if="note.type === 'txt'"
			class="main-content txt"
			placeholder="Note.."
			v-model="note.info.txt"
			@input="updateNote(note)"
		>
		</textarea>

		<div v-else class="main-content list">
			<ul class="clean-list list-style">
				<li class="list-item flex" v-for="(item, i) in note.info.list">
					<input
						type="checkbox"
						v-model="note.info.list[i].isChecked"
						@change="updateNote(note)"
					/>
					<input
						type="text"
						ref="todos"
						v-model="note.info.list[i].txt"
						@input="updateNote(note)"
					/>
					<button class="xmark svg-btn" @click="onDeleteTodo(i)"></button>
				</li>
			</ul>
			<div class="add-todo flex">
				<div class="plus"></div>
				<input
					ref="new"
					type="text"
					placeholder="Item in list"
					@input="onSetVal"
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
		onGoToDetails() {
			this.$emit('goToDetails')
		},
		onSetVal(ev) {
			let val
			switch (this.note.type) {
				case 'txt':
					val = ev.target.innerText
					this.newNote.info.txt = val
					break
				case 'list':
					val = ev.target.value
					if (!this.noteCopy.info.list) this.noteCopy.info.list = []
					const newTodo = { txt: val, isChecked: false }
					let newTodoIdx = this.noteCopy.info.list.length
					this.noteCopy.info.list.push(newTodo)

					ev.target.value = ''

					this.$nextTick(() => {
						this.$refs.todos[newTodoIdx].focus()
					})
					break
			}

			this.updateNote(this.noteCopy)
		},
		onDeleteImg(idx) {
			const noteCopy = JSON.parse(JSON.stringify(this.note))
			noteCopy.info.imgs.splice(idx, 1)
			this.updateNote(noteCopy)
		},
		onDeleteTodo(idx) {
			const noteCopy = JSON.parse(JSON.stringify(this.note))
			noteCopy.info.list.splice(idx, 1)
			this.updateNote(noteCopy)
		},
		updateNote(note) {
			this.$emit('save', JSON.parse(JSON.stringify(note)))
		},
	},
}
</script>

<!-- // onUpdateNoteInfo(el, itemIdx) {
	// 	const noteCopy = JSON.parse(JSON.stringify(this.note))
	// 	switch (noteCopy.type) {
		// 		case 'txt':
		// 			noteCopy.info.txt = el.target.value
		// 			break
		// 		case 'list':
		// 			// console.log(el.target.checked)
		// 			// console.log(el.target.value)
		// 			console.log(el)
		// 			break
		// 	}
		// 	this.updateNote(noteCopy)
		// },
		// onUpdateNoteTitle(el) {
			// 	const noteCopy = JSON.parse(JSON.stringify(this.note))
			// 	noteCopy.info.title = el.target.innerText
			// 	this.updateNote(noteCopy)
			// }, -->
<!-- <div
	v-if="note.type === 'txt'"
	class="main-content txt"
	contenteditable
	@input="updateNoteInfo"
	>
	{{ note.info.txt }}
</div> -->

<!-- <div v-if="note.type === 'txt'" class="main-content">
	<pre class="txt" contenteditable="true" @input="updateNoteInfo">
		{{ note.info.txt }}
		</pre
		>
	</div> -->
<!-- <div v-for="(item, i) in noteCopy.info.list" class="item-container flex">
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
			</div> -->

<!-- <ul class="clean-list list-style">
				<li class="list-item flex" v-for="(item, idx) in note.info.list">
					<input
						type="checkbox"
						:checked="item.isChecked"
						@change="onUpdateNoteInfo($event, idx)"
					/>
					<input
						type="text"
						ref="todos"
						:value="item.txt"
						@input="onUpdateNoteInfo($event, idx)"
					/>
					<button class="xmark svg-btn" @click="onDeleteTodo(i)"></button>
				</li>
			</ul> -->
