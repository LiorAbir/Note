import { userService } from '../../services/user-service'
import { showUserMsg } from '../../services/eventBus-service'

export default {
	state: {
		loggedInUser: null,
	},
	getters: {
		loggedInUser(state) {
			return state.loggedInUser
		},
	},
	mutations: {
		setUser(state, { user }) {
			state.loggedInUser = user
		},
	},
	actions: {
		async loadLoggedInUser({ commit }) {
			try {
				const user = await userService.getLoggedinUser()
				commit({ type: 'setUser', user })
			} catch (err) {
				console.log('Cannot load user')
			}
		},
		async login({ commit }, { credentials }) {
			try {
				const user = await userService.login(credentials)
				commit({ type: 'setUser', user })
				return Promise.resolve()
			} catch (err) {
				console.log('Cannot login')
				showUserMsg('username or password is incorrect')
			}
		},
		async signup({ commit }, { signupInfo }) {
			try {
				const user = await userService.signUp(signupInfo)
				commit({ type: 'setUser', user })
			} catch (err) {
				console.log('Cannot signup')
				showUserMsg('Cannot signup. Please try again')
			}
		},
		async logout({ commit }) {
			try {
				await userService.logout()
				const user = null
				commit({ type: 'setUser', user })
			} catch (err) {
				console.log('Cannot logout')
			}
		},
	},
}
