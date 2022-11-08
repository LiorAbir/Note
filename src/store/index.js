import { createStore } from 'vuex'
import noteStore from './modules/note-store'

const store = createStore({
	strict: true,
	modules: {
		noteStore,
	},
})

export default store
