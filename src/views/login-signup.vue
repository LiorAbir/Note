<template>
	<appHeader />
	<section class="login-signup">
		<div class="logo">
			<router-link to="/">logo</router-link>
		</div>
		<section class="login-signup-container flex">
			<div class="login">
				<h1>login</h1>
				<form @submit="onLogin">
					{{ credentials }}
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
				{{ signUpInfo }}
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
	</section>
</template>
<script>
import appHeader from '../components/app-header.vue'
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
		onLogin(ev) {
			ev.preventDefault()
			console.log(this.credentials)
		},
		onSignup(ev) {
			ev.preventDefault()
			console.log(this.signUpInfo)
		},
	},
	components: {
		appHeader,
	},
}
</script>
