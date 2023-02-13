<template>
	<section class="login-signup">
		<div class="logo">
			<router-link to="/">Noted .</router-link>
		</div>
		<section class="login-signup-container flex">
			<div class="login" v-if="isLogin">
				<h1 class="title">Login</h1>
				<form @submit="onLogin">
					<input
						type="text"
						v-model="credentials.username"
						autocomplete="username"
						required
						placeholder="Enter Username"
					/>
					<input
						:type="inputType"
						v-model="credentials.password"
						autocomplete="current-password"
						required
						placeholder="Enter Password"
					/>
					<label class="flex">
						<input
							type="checkBox"
							@change="onChangeInput($event)"
						/><span>Show password</span>
					</label>
					<button class="btn login-btn">Sign in</button>
				</form>

				<button class="move-to" @click="this.isLogin = false">
					Dont have an acount yet?
				</button>
			</div>

			<!--  -->
			<div class="signup" v-else>
				<h1 class="title">Signup</h1>

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
						:type="inputType"
						v-model="signUpInfo.password"
						required
						placeholder="Password"
					/>
					<label class="flex">
						<input
							type="checkBox"
							@change="onChangeInput($event)"
						/><span>Show password</span>
					</label>
					<button class="btn login-btn">Sign up</button>
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
			inputType: 'password',
			loggedInUser: null,
			credentials: {
				username: 'liorabir',
				password: '123456',
			},
			signUpInfo: {
				fullname: '',
				username: '',
				email: '',
				password: '',
			},
		}
	},
	methods: {
		async onLogin(ev) {
			ev.preventDefault()
			await this.$store.dispatch({
				type: 'login',
				credentials: this.credentials,
			})
			this.$router.push('/notes')
		},
		async onSignup(ev) {
			ev.preventDefault()
			await this.$store.dispatch({
				type: 'signup',
				signupInfo: this.signUpInfo,
			})
			this.$router.push('/notes')
		},
		onLogout() {
			this.$store.dispatch({ type: 'logout' })
			this.$router.push('/login')
		},
		onChangeInput(ev) {
			this.inputType = ev.target.checked ? 'text' : 'password'
		},
	},
}
</script>
