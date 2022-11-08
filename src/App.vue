<template>
	<h1>my-app</h1>
	<RouterView />
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'

export default {
	name: 'app',
	created() {
		this.$store.dispatch({ type: 'loadNotes' })
	},
}
</script>

<style></style>
