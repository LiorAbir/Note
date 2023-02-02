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
				location: '',
			},
		}
	},
	methods: {
		setFilterBy() {
			this.$emit('setFilterBy', this.filterBy)
		},
	},
	watch: {
		'$route.params.type': {
			handler(type) {
				if (this.$route.params.id) return
				this.filterBy.location = type
				this.$emit('setFilterBy', this.filterBy)
			},
			immediate: true,
		},
	},
}
</script>
<style></style>
