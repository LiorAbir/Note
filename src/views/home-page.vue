<template>
	<section class="home-page">
		<header class="home-page-header flex">
			<nav class="main-nav">
				<router-link class="first" to="/note">Note</router-link>
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
				<router-link to="/note">
					<button class="start-btn">Start for free</button>
				</router-link>
			</div>
			<img src="../assets/img/notesUndraw.svg" alt="note" />
		</div>
	</section>
</template>
<script>
export default {}
</script>
<style></style>
