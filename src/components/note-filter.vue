<template>
	<section class="note-filter">
		<!-- <input
				class="filter-input"
				type="text"
				@input="setFilterBy"
				v-model="filterBy.txt"
				placeholder="Search"
				/> -->

		<div
			v-if="filter.color || filter.label || filter.type || filter.txt"
			class="note-list"
			:style="{ float: 'right' }"
		>
			<div v-if="!notes.length">Cannot find notes</div>
			<notePreview v-for="note in notes" :note="note" />
		</div>

		<div class="filters-container" v-else>
			<!-- {{ notes.length }}
			{{ boardColors }} -->
			<transition-group appear @before-enter="beforeEnter" @enter="enter">
				<div class="types-filter container" key="types" data-delay="1">
					<h4 class="title">Types</h4>

					<div class="list flex">
						<div
							class="filter list-filter"
							v-for="noteType in notesTypes"
							@click="onUpdateFilter('type', noteType)"
						>
							<h5 class="filter-name">{{ noteType }}</h5>
							<div class="filter-image" :class="noteType"></div>
						</div>
					</div>
				</div>

				<div class="labels-filter container" key="labels" data-delay="2">
					<h4 class="title">Labels</h4>
					<div class="list flex">
						<div
							class="filter label-filter"
							v-for="label in board.labels"
							@click="onUpdateFilter('label', label)"
						>
							<h5 class="filter-name">{{ label }}</h5>
							<div class="filter-image"></div>
						</div>
					</div>
				</div>
				<div class="colors-filter container" key="colors" data-delay="3">
					<h4 class="title">Colors</h4>
					<div class="list flex">
						<div
							class="color"
							v-for="color in boardColors"
							:style="{ backgroundColor: color.clr }"
							@click="onUpdateFilter('color', color.name)"
						></div>
					</div>
				</div>
			</transition-group>
		</div>
	</section>
</template>

<script>
import notePreview from './note-preview.vue'
import gsap from 'gsap'

export default {
	name: 'search',
	props: {
		notes: Array,
		board: Object,
		filter: Object,
	},
	data() {
		return {
			boardColors: [],
			notesTypes: ['lists', 'images'],
			isShowNotes: false,
		}
	},
	created() {
		let clrsStack = []
		this.notes.map((note) => {
			const values = clrsStack.map((clr) => clr.clr)
			if (values.includes(note.bgClr.clr)) return
			clrsStack.push(note.bgClr)
		})
		this.boardColors = clrsStack
	},
	methods: {
		onUpdateFilter(type, val) {
			this.filter[type] = val
			this.$router.push(`/search/${type}%3D${val}`)

			// this.$emit('changePage', 'search', { [type]: val })
			// this.setFilterBy()
		},
		// setFilterBy() {
		// 	// this.$emit('setFilterBy', this.filter)
		// },
		beforeEnter(el) {
			el.style.opacity = 0
			el.style.transform = 'translateY(100px)'
		},
		enter(el, done) {
			gsap.to(el, {
				opacity: 1,
				y: 0,
				duration: 0.4,
				onComplete: done,
				delay: el.dataset.delay * 0.2,
			})
		},
	},
	components: {
		notePreview,
	},
}
</script>
<style></style>

<!-- // watch: {
// 	'$route.params.type': {
// 		handler(type) {
// 			// 	console.log('params in filter')
// 			if (this.$route.params.id) return
// 			if (type === 'label') {
// 				console.log(this.$route.params)
// 				return
// 			}
// 			if (type === 'search') {
// 				this.filter.location = ''
// 				this.$emit('setFilterBy', this.filter)
// 				return
// 			}
// 			this.filter.location = type
// 			this.$emit('setFilterBy', this.filter)
// 		},
// 		immediate: true,
// 	},
// }, -->
