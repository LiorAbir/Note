<template>
	<section class="note-filter">
		<!-- <input
				class="filter-input"
				type="text"
				@input="setFilterBy"
				v-model="filterBy.txt"
				placeholder="Search"
				/> -->
		<!-- {{ notes }} -->

		<div
			class="note-list"
			v-if="filter.color || filter.label || filter.type || filter.txt"
			:style="{ float: 'right' }"
		>
			<div v-if="!notes.length">Cannot find notes</div>
			<notePreview v-for="note in notes" :note="note" />
		</div>

		<div class="filters-container" v-else>
			<!-- {{ filter }} -->
			<!-- {{ filterBy }} -->
			<transition-group appear @before-enter="beforeEnter" @enter="enter">
				<div class="types-filter container" key="types" data-delay="1">
					<h4 class="title">Types</h4>

					<div class="list flex">
						<div class="filter list-filter">
							<h5 class="filter-name">Lists</h5>
							<div class="filter-image"></div>
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
							:style="{ backgroundColor: color }"
							@click="onUpdateFilter('color', color)"
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
			isShowNotes: false,
			// filterBy: null,
		}
	},
	created() {
		let clrsStack = []
		this.notes.map((note) => {
			if (clrsStack.includes(note.bgClr)) return
			clrsStack.push(note.bgClr)
		})
		this.boardColors = clrsStack

		// this.filterBy = this.filter
	},
	methods: {
		onUpdateFilter(type, val) {
			this.filter[type] = val
			this.setFilterBy()
		},
		setFilterBy() {
			this.$emit('setFilterBy', this.filter)
		},
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
	watch: {
		'$route.params.type': {
			handler(type) {
				if (this.$route.params.id) return
				if (type === 'search') {
					this.filter.location = ''
					this.$emit('setFilterBy', this.filter)
					return
				}
				this.filter.location = type
				this.$emit('setFilterBy', this.filter)
			},
			immediate: true,
		},
	},
}
</script>
<style></style>
