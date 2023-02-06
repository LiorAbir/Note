<template>
	<div v-clickOutSide="onCloseModal" class="labels-modal modal">
		<!-- {{ labels }} -->
		<div class="content">
			<h3 class="title">Edit labels</h3>

			<div class="add-label flex" :class="{ active: isAddLabelFocus }">
				<button
					class="xmark-btn svg-btn"
					@click="isAddLabelFocus = !isAddLabelFocus"
				></button>
				<input
					type="text"
					placeholder="Add new label"
					@focus=";(isAddLabelFocus = true), (isEditLabelFocus = false)"
					v-model="newLabel"
					v-on:keyup.enter="onAddLabel"
				/>
				<button class="add-btn svg-btn" @click="onAddLabel"></button>
			</div>

			<ul class="labels-list clean-list">
				<li
					v-for="(label, i) in labels"
					:key="label + i"
					class="label-container flex"
					:class="{ active: isEditLabelFocus }"
				>
					<button
						class="delete-btn svg-btn"
						@click="onDeleteLabel(i)"
					></button>
					<input
						type="text"
						:placeholder="label"
						@change="onEditLabel($event, index)"
						@focus="
							;(isEditLabelFocus = true), (isAddLabelFocus = false)
						"
					/>
					<button class="edit-btn svg-btn"></button>
				</li>
			</ul>
		</div>

		<div class="btns-container flex">
			<button class="btn" @click="onCloseModal">Done</button>
		</div>
	</div>
</template>
<script>
export default {
	name: 'labels-modal',
	props: {
		labels: Array,
	},
	data() {
		return {
			isAddLabelFocus: false,
			isEditLabelFocus: false,
			newLabel: '',
			labelEdit: '',
		}
	},
	methods: {
		onAddLabel() {
			const labelsCopy = this.labels.slice()
			labelsCopy.unshift(this.newLabel)
			this.$emit('updateLabels', labelsCopy)
			this.newLabel = ''
		},
		onDeleteLabel(idx) {
			// console.log(label)
			const labelsCopy = this.labels.slice()
			// const idx = labelsCopy.findIndex((l) => l === label)
			labelsCopy.splice(idx, 1)
			this.$emit('updateLabels', labelsCopy)
		},
		onEditLabel(ev, idx) {
			console.log('jj')
			const labelsCopy = this.labels.slice()
			labelsCopy.splice(idx, 1, ev.target.value)
			// this.$emit('updateLabels', labelsCopy)
			// this.isEditLabelFocus = true
		},
		onCloseModal() {
			this.$emit('closeLabelModal')
		},
	},
}
</script>
