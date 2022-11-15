<template>
	<div class="note-todos-container">
		<ul>
			<li class="todo-content" v-for="(todo, i) in info.todos" :key="i">
				<!-- <label class="container">
					<input type="checkbox" />
					<span class="checkmark"></span>
				</label> -->
				<div contenteditable="true" @input="updateNote($event, i)">
					{{ todo.txt }}
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	props: {
		info: Object,
	},
	methods: {
		updateNote(ev, index) {
			this.info.todos[index].txt = ev.target.innerText
			this.$emit('updateNote', this.info)
		},
	},
}
</script>
<style></style>
