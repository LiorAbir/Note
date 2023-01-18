<template>
	<div class="archive note-list">
		{{ notes }}
	</div>
</template>
<script>
export default {
	name: 'archive',
	props: {
		notes: Array,
	},
	components: {},
}
</script>
