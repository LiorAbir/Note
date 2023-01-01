<template>
	<section class="login-signup-container flex">
		<div class="login">
			<h1>login</h1>
			<form @submit="onalogin">
				<input
					type="text"
					v-model="credentials.username"
					required
					placeholder="Enter Username"
				/>
				<input
					type="text"
					v-model="credentials.password"
					required
					placeholder="Enter Password"
				/>
				<button class="btn login-btn">Sign in</button>
			</form>
		</div>
		<div class="signup">
			<h1>signup</h1>
			<form @submit="onSignup">
				<input
					type="text"
					v-model="signUpInfo.fullName"
					required
					placeholder="Full name"
				/>
				<input
					type="text"
					v-model="signUpInfo.username"
					required
					placeholder="username"
				/>
				<input
					type="text"
					v-model="signUpInfo.email"
					required
					placeholder="Email"
				/>
				<input
					type="text"
					v-model="signUpInfo.password"
					required
					placeholder="Password"
				/>
				<button class="btn login-btn">Create account</button>
			</form>
		</div>
	</section>
</template>
<script>
export default {
	name: 'login-signup',
	data() {
		return {
			loggedInUser: null,
			credentials: {
				username: '',
				password: '',
			},
			signUpInfo: {
				fullName: '',
				username: '',
				email: '',
				password: '',
			},
		}
	},
	created() {},
	methods: {
		onLogin() {
			console.log(this.credentials)
		},
		onSignup() {
			console.log(this.signUpInfo)
		},
	},
}
</script>
