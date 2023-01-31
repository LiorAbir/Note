<template>
	<div v-clickOutSide="onCloseModal" class="labels-modal modal">
		{{ labels }}
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
					@focus="isAddLabelFocus = true"
					v-model="newLabel"
					v-on:keyup.enter="onAddLabel"
				/>
				<button class="add-btn svg-btn" @click="onAddLabel"></button>
			</div>
			<div
				class="label-container flex"
				:class="{ active: isEditLabelFocus }"
				v-for="label in labels"
			>
				<button class="delete-btn svg-btn"></button>
				<input
					type="text"
					:placeholder="label"
					@focus="isEditLabelFocus = true"
					@focusout="isEditLabelFocus = false"
				/>
				<button class="edit-btn svg-btn"></button>
			</div>
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
		}
	},
	methods: {
		onAddLabel() {
			const labelsCopy = this.labels.slice()
			console.log(this.labels)
			// this.labelsCopy.push(this.newLabel)
			// this.$emit('updateLabels', this.labelsCopy)
			// this.newLabel = ''
		},
		onCloseModal() {
			this.$emit('closeLabelModal')
		},
	},
}
</script>
