<template>
	<section class="note-filter">
		<!-- <input
			class="filter-input"
			type="text"
			@input="setFilterBy"
			v-model="filterBy.txt"
			placeholder="Search"
		/> -->
		<div class="filters-container">
			<div class="types-filter container">
				<h4 class="title">Types</h4>

				<div class="list flex">
					<div class="filter list-filter">
						<h5 class="filter-name">Lists</h5>
						<div class="filter-image"></div>
					</div>
				</div>
			</div>

			<div class="labels-filter container">
				<h4 class="title">Labels</h4>
				<div class="list flex">
					<div class="filter label-filter">
						<h5 class="filter-name">Labels</h5>
						<div class="filter-image"></div>
					</div>
				</div>
			</div>
			<div class="colors-filter container">
				<h4 class="title">Colors</h4>
				<div class="list flex">
					<div class="color"></div>
				</div>
			</div>
		</div>
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
