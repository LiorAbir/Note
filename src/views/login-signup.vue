<template>
	<section class="login-signup">
		<div class="logo">
			<router-link to="/">Noted .</router-link>
		</div>
		<section class="login-signup-container flex">
			<div class="login" v-if="isLogin">
				<h1 class="title">Login</h1>
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
					<div class="btns flex">
						<button class="btn login-btn">Sign in</button>
						<button class="sign-in" @click="this.isLogin = false">
							Dont have an acount yet?
						</button>
					</div>
				</form>
			</div>
			<div class="signup" v-else>
				<h1 class="title">Signup</h1>
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
					<div class="btns flex">
						<button class="btn login-btn">Sign up</button>
						<button class="sign-in" @click="this.isLogin = true">
							Already have an account?
						</button>
					</div>
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
			isLogin: true,
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
