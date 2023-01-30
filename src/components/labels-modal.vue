<template>
	<div v-clickOutSide="onCloseModal" class="labels-modal modal">
		<div class="content">
			<h3 class="title">Edit labels</h3>

			<form
				class="add-label flex"
				:class="{ active: isAddLabelFocus }"
				@submit="onAddLabel"
			>
				<button
					class="xmark-btn svg-btn"
					@click="isAddLabelFocus = !isAddLabelFocus"
				></button>
				<input
					type="text"
					placeholder="Add new label"
					@focus="isAddLabelFocus = true"
					v-model="newLabel"
				/>
				<button class="add-btn svg-btn" @click="onAddLabel"></button>
			</form>

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
	data() {
		return {
			labels: [],
			isAddLabelFocus: false,
			isEditLabelFocus: false,
			newLabel: '',
		}
	},
	methods: {
		onAddLabel(ev) {
			ev.preventDefault()

			this.labels.push(this.newLabel)
			this.newLabel = ''
		},
		onCloseModal() {
			this.$emit('closeLabelModal')
			// this.$router.push('')
		},
	},
}
</script>
