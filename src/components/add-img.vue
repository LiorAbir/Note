<template>
	<label class="add-img svg-btn">
		<!-- <button class="img-btn svg-btn" title="add image to note"></button> -->
		<!-- <img
			class="img-btn"
			src="../assets/icon/image.svg"
			alt="image"
			title="add image to note"
		/> -->
		<input
			type="file"
			name="file"
			:style="{ display: 'none' }"
			@change="handleFile"
		/>
	</label>
</template>
<script>
import { uploadImg } from '../services/img-upload.service'
export default {
	name: 'add-img',
	methods: {
		handleFile(ev) {
			const file = ev.target.files[0]
			this.uploadFile(file)
		},
		async uploadFile(file) {
			const res = await uploadImg(file)
			this.$emit('addImgUrl', res.url)
			// this.$emit('setIsLoading', true)
			// this.$emit('setIsLoading', false)
		},
	},
}
</script>
<style></style>
