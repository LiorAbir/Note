<template>
	<section
		class="home-page"
		:style="{ 'background-image': 'url(../assets/img/blob.svg)' }"
	>
		<header class="home-page-header flex">
			<nav class="main-nav">
				<router-link to="/note">Note</router-link>
				<router-link to="/note">About</router-link>
			</nav>
		</header>

		<div class="home-page-content flex">
			<div class="get-started flex">
				<h1>noted .</h1>
				<p>
					Lorem, ipsum dolor sit amet consectetur adipisicing elit.
					Molestias, eius? Laboriosam quasi eveniet tempore incidunt, sed
					quae fugiat veniam quas unde accusamus suscipit pariatur quaerat,
					ducimus omnis sint. Iure, distinctio.
				</p>
				<button class="start-btn">Start for free</button>
			</div>
			<img src="../assets/img/notesUndraw.svg" alt="note" />
		</div>
	</section>
</template>
<script>
export default {}
</script>
<style></style>
