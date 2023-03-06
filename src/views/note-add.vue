<template>
	<div class="note-add" v-if="isFocus === false" @click="isFocus = true">
		<!-- {{ newNote }} -->
		<div class="add-container flex">
			<h4 class="title">Add note...</h4>
			<div class="types round flex">
				<button
					class="btn type-btn svg-btn"
					@click="setNoteType('list')"
				></button>
			</div>
		</div>
	</div>
	<!--  -->
	<div
		class="note-add full-page"
		v-if="isFocus"
		v-clickOutSide="closeAddNote"
		:style="{
			backgroundColor: newNote.bgClr,
		}"
	>
		<pre>{{ newNote }}</pre>
		<div class="actions-mobile flex">
			<button class="btn back-btn" @click="closeAddNote">Back</button>
		</div>
		<div class="add-note-input">
			<div
				class="content-input flex"
				:style="{
					'background-image': `url(${newNote.bgImg})`,
				}"
			>
				<div class="note-imgs" v-if="newNote.info.imgs">
					<div class="img-container" v-for="(img, i) in newNote.info.imgs">
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
					placeholder="Title"
					v-model="newNote.info.title"
				/>

				<div
					v-if="newNote.type === 'txt'"
					contenteditable
					class="note-content txt"
					placeholder="Add note content"
					@input="setVal"
				></div>

				<div v-else class="note-content">
					<ul
						class="clean-list"
						v-if="newNote.info.list && newNote.info.list.length"
					>
						<li
							v-for="(item, i) in newNote.info.list"
							class="list-item flex"
						>
							<input
								:ref="'todo' + i"
								type="checkbox"
								v-model="newNote.info.list[i].isChecked"
							/>
							<input type="text" v-model="newNote.info.list[i].txt" />
							<button
								class="xmark svg-btn"
								@click="onDeleteTodo(i)"
							></button>
						</li>
					</ul>
					<div class="add-todo flex">
						<div class="plus"></div>
						<input
							ref="input"
							type="text"
							placeholder="Item in list"
							@input="setVal"
						/>
					</div>
				</div>
			</div>

			<div class="actions flex">
				<div class="flex">
					<addImg @addImgUrl="addImgUrl" />
					<div class="clr-btn-container">
						<button
							class="clr-btn svg-btn"
							title="choose background"
							@click="isClrPlt = !isClrPlt"
						></button>
						<backgroundPallete
							v-if="isClrPlt"
							@setBackground="setBackground"
							v-clickOutSide="closeClrPlt"
						/>
					</div>
				</div>
				<button @click="save">Save</button>
			</div>
		</div>
	</div>
</template>
<script>
import backgroundPallete from '../components/background-pallete.vue'
import addImg from '../components/add-img.vue'

export default {
	name: 'note-add',
	data() {
		return {
			newNote: null,
			newTodo: '',
			isFocus: false,
			isClrPlt: false,
		}
	},
	created() {
		this.getNewNote()
	},
	methods: {
		getNewNote() {
			this.newNote = JSON.parse(JSON.stringify(this.$store.getters.emptyNote))
		},
		setNoteType(type) {
			this.newNote.type = type
		},
		setVal(ev) {
			let val = ev.target.value
			switch (this.newNote.type) {
				case 'txt':
					this.newNote.info.txt = val
					break
				case 'list':
					if (!this.newNote.info.list) this.newNote.info.list = []
					const newTodo = { txt: val, isChecked: false }
					this.newNote.info.list.push(newTodo)
					ev.target.value = ''
					// this.$refs.todo.focus()
					break
			}
			console.log(this.$refs.todo)
		},
		setBackground(fill, type) {
			this.isFocus = true
			this.newNote[type] = fill
		},
		save() {
			this.$store.dispatch({ type: 'saveNote', note: this.newNote })
			this.closeAddNote()
			this.isFocus = false
		},
		closeAddNote() {
			console.log('close')
			if (this.isClrPlt) return
			// if (this.isClrPlt === false) {
			// 	this.isFocus = false
			// 	this.getNewNote()
			// }
			this.isFocus = false
			this.getNewNote()
			this.newNote.type = 'txt'
		},
		addImgUrl(url) {
			this.newNote.info.imgs.push(url)
		},
		deleteImg(index) {
			this.newNote.info.imgs.splice(index, 1)
		},
		onDeleteTodo(idx) {
			this.newNote.info.list.splice(idx, 1)
		},
		closeClrPlt() {
			this.isClrPlt = false
		},
	},
	computed: {
		// setInputPlaceHolder() {
		// 	switch (this.newNote.type) {
		// 		case 'note-txt':
		// 			return "What's on your mind..."
		// 			break
		// 		case 'note-todos':
		// 			return 'Enter comma separated list...'
		// 			break
		// 	}
		// },
	},
	components: {
		backgroundPallete,
		addImg,
	},
}
</script>
<style></style>
