<template>
	<section class="note-list">
		<h1>note list</h1>
		<ul class="clean-list">
			<li class="note-container" v-for="note in notes" :key="note._id">
				<notePreview :note="note" />
			</li>
		</ul>
	</section>
</template>

<script>
import notePreview from './note-preview.vue'

export default {
	name: 'note-list',
	props: {
		notes: {
			type: Array,
			requaired: true,
		},
	},
	components: {
		notePreview,
	},
}
</script>

<style>
.note-list {
	background-color: lightcoral;
	padding: 5px;
}
</style>
