<template>
	<div class="note-img-container">
		<img class="note-img" :src="info.url" alt="note-img" />
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
