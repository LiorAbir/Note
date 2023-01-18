<template>
	<div class="trash">
		<h1>Trash</h1>
		{{ notes }}
	</div>
</template>
<script>
export default {
	name: 'trash',
	props: {
		notes: Array,
	},
}
</script>
