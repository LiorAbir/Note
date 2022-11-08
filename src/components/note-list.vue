<template>
	<section class="note-list">
		<ul>
			<li v-for="note in notes" :key="note._id" class="note-container">
				{{ note }}
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

<style></style>
