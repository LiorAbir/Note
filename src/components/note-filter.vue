<template>
	<section class="note-filter">
		<input
			class="filter-input"
			type="text"
			@input="setFilterBy"
			v-model="filterBy.txt"
			placeholder="Search"
		/>
	</section>
</template>

<script>
export default {
	name: 'note-filter',
	data() {
		return {
			filterBy: {
				txt: '',
			},
		}
	},
	methods: {
		setFilterBy() {
			this.$emit('setFilterBy', this.filterBy)
		},
	},
}
</script>
<style></style>
