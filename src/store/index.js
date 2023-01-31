import { createStore } from 'vuex'
import noteStore from './modules/note-store'
import userStore from './modules/user-store'
import boardStore from './modules/board-store'

const store = createStore({
	strict: true,
	modules: {
		noteStore,
		userStore,
		boardStore,
	},
})

export default store
