<template>
	<div class="note-todos-container">
		<ul>
			<li v-for="txt in info.todos">{{ txt.txt }}</li>
		</ul>
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
