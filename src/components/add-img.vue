<template>
	<label class="add-img">
		<img src="../assets/icon/image.svg" alt="image" title="add image to note" />
		<input type="file" :style="{ display: 'none' }" @change="handleFile" />
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
			this.$emit('setIsLoading', true)
			const res = await uploadImg(file)
			this.$emit('addImgUrl', res.url)
			this.$emit('setIsLoading', false)
		},
	},
}
</script>
<style></style>
