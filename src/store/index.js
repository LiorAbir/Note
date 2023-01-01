import { createStore } from 'vuex'
import noteStore from './modules/note-store'
import userStore from './modules/user-store'

const store = createStore({
	strict: true,
	modules: {
		noteStore,
		userStore,
	},
})

export default store
