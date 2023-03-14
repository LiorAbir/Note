<template>
	<div class="note-add" v-if="isFocus === false" @click="onOpenAddNote">
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

				<div v-if="newNote.type === 'txt'" class="note-content txt">
					<pre
						ref="txt"
						class="txt"
						contenteditable
						@input="onSetVal"
						placeholder="Add note content"
					></pre>
				</div>

				<div v-else class="note-content">
					<ul
						class="clean-list"
						v-if="newNote.info.list && newNote.info.list.length"
					>
						<li
							v-for="(item, i) in newNote.info.list"
							class="list-item flex"
						>
							<!-- :ref="`todo${i}`" -->
							<input
								ref="todos"
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
							ref="new"
							type="text"
							placeholder="Item in list"
							@input="onSetVal"
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
		onSetVal(ev) {
			let val
			switch (this.newNote.type) {
				case 'txt':
					val = ev.target.innerText
					this.newNote.info.txt = val
					break
				case 'list':
					val = ev.target.value
					if (!this.newNote.info.list) this.newNote.info.list = []
					const newTodo = { txt: val, isChecked: false }
					let newTodoIdx = this.newNote.info.list.length
					this.newNote.info.list.push(newTodo)

					ev.target.value = ''

					this.$nextTick(() => {
						this.$refs.todos[newTodoIdx].focus()

						// this.$refs['todo' + newTodoIdx][0].focus()
					})
					break
			}
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
			if (this.isClrPlt) return
			this.isFocus = false
			this.getNewNote()
			this.newNote.type = 'txt'
		},
		onOpenAddNote() {
			this.isFocus = true
			this.$nextTick(() => {
				let refName = this.newNote.type === 'txt' ? 'txt' : 'new'
				this.$refs[refName].focus()
			})
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
