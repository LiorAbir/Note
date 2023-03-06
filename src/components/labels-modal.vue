<template>
	<div v-clickOutSide="onCloseModal" class="labels-modal modal">
		<!-- {{ labels }} -->
		<!-- {{ oldLabel }} -->
		<div class="content">
			<h3 class="title">Edit labels</h3>

			<div class="add-label flex">
				<!-- :class="{ active: isAddLabelFocus } -->
				<button class="xmark-btn svg-btn" @click="this.blur"></button>
				<!-- isAddLabelFocus = !isAddLabelFocus -->
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
				<li v-for="(label, i) in labels" :key="i">
					<div
						class="label-container flex"
						:class="{ active: isEditLabelFocus }"
					>
						<button
							class="delete-btn svg-btn"
							@click="onDeleteLabel(i, label)"
						></button>
						<input
							type="text"
							placeholder="Label name"
							:value="label"
							@change="onEditLabel($event, i)"
							@focus="onFocusActions"
						/>
						<!-- @change="onEditLabel($event, index)" -->
						<button class="edit-btn svg-btn"></button>
					</div>
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
		notes: Array,
	},
	data() {
		return {
			isAddLabelFocus: false,
			isEditLabelFocus: false,
			newLabel: '',
			oldLabel: '',
		}
	},
	methods: {
		onFocusActions(ev) {
			this.oldLabel = ev.target.value
			this.isAddLabelFocus = false
			this.isEditLabelFocus = true
		},
		onAddLabel() {
			let labelsCopy = this.labels.slice()
			labelsCopy.unshift(this.newLabel)
			this.$emit('updateLabels', labelsCopy)
			this.newLabel = ''
		},
		onDeleteLabel(idx, label) {
			let labelsCopy = this.labels.slice()
			labelsCopy.splice(idx, 1)
			this.$emit('updateLabels', labelsCopy)
			this.updateNoteLabels(label)
		},
		onEditLabel(ev, idx) {
			let labelsCopy = this.labels.slice()
			labelsCopy[idx] = ev.target.value

			this.updateNoteLabels(this.oldLabel, ev.target.value)
			this.$emit('updateLabels', labelsCopy)
		},
		updateNoteLabels(oldLabel, newLabel) {
			this.notes.map((note) => {
				if (note.labels.includes(oldLabel)) {
					let idx = note.labels.findIndex((label) => label === oldLabel)
					const noteCopy = JSON.parse(JSON.stringify(note))
					if (newLabel) {
						noteCopy.labels.splice(idx, 1, newLabel)
						this.oldLabel = newLabel
					} else {
						noteCopy.labels.splice(idx, 1)
					}
					this.$emit('updateNote', noteCopy)
				}
			})
		},
		onCloseModal() {
			this.$emit('closeLabelModal')
		},
	},
}
</script>
