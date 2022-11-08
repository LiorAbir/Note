<template>
	<div class="note-video-container">
		<iframe :src="info.url" frameborder="0"></iframe>
	</div>
</template>
<script>
export default {
	props: {
		info: Object,
	},
}
</script>
<style></style>
