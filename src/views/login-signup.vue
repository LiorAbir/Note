<template>
	<section class="login-signup">
		<div class="logo">
			<router-link to="/">Noted .</router-link>
		</div>
		<section class="login-signup-container flex">
			<div class="login" v-if="isLogin">
				<h1 class="title">Login</h1>
				<form @submit="onLogin">
					<!-- {{ credentials }} -->
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
					<button class="btn login-btn" @click="onLogin">Sign in</button>
				</form>

				<button class="move-to" @click="this.isLogin = false">
					Dont have an acount yet?
				</button>
			</div>
			<div class="signup" v-else>
				<h1 class="title">Signup</h1>
				<!-- {{ signUpInfo }} -->
				<form @submit="onSignup">
					<input
						type="text"
						v-model="signUpInfo.fullname"
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
						type="email"
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
					<button class="btn login-btn" @click="onSignup">Sign up</button>
				</form>

				<button class="move-to" @click="this.isLogin = true">
					Already have an account?
				</button>
			</div>
		</section>
		<button @click="onLogout">logout</button>
	</section>
</template>
<script>
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
				fullname: 'Lior Abir',
				username: 'liorabir',
				email: 'lior@gmail.com',
				password: '123456',
			},
		}
	},
	methods: {
		async onLogin(ev) {
			ev.preventDefault()
			this.$store.dispatch({
				type: 'login',
				credentials: this.credentials,
			})
		},
		onSignup(ev) {
			ev.preventDefault()
			this.$store.dispatch({
				type: 'signup',
				signupInfo: this.signUpInfo,
			})
		},
		onLogout() {
			this.$store.dispatch({ type: 'logout' })
		},
	},
}
</script>
