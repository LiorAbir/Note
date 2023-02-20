import { noteService } from '../../services/note-service.js'

export default {
	state: {
		notes: null,
		filter: {
			txt: '',
			location: '',
			label: '',
			color: '',
			type: '',
		},
	},
	getters: {
		notes(state) {
			return state.notes
		},
		notesToDisplay({ filter, notes }) {
			if (!notes) return
			let { txt, location, label, color, type } = filter

			//TEXT
			const regexTst = new RegExp(txt, 'i')
			let filteredNotes = notes.filter((note) => {
				if (note.type === 'note-txt') {
					return (
						regexTst.test(note.info.txt) ||
						regexTst.test(note.info.title)
					)
				} else if (note.type === 'note-todos') {
					note.info.todos.filter((todo) => {
						return regexTst.test(todo.txt) || note.info.title
					})
				}
			})

			//LOCATION
			if (location) {
				filteredNotes = notes.filter((note) => {
					return note.location === location
				})
			}

			//COLORS
			if (color) {
				filteredNotes = filteredNotes.filter((note) => {
					return note.bgClr === color
				})
			}

			//LABELS

			return filteredNotes
		},
		filterBy({ filter }) {
			return JSON.parse(JSON.stringify(filter))
			// return filter
		},
		emptyNote() {
			return noteService.getEmptyNote()
		},
	},
	mutations: {
		setNotes(state, { notes }) {
			state.notes = notes
		},
		removeNote(state, { id }) {
			const idx = state.notes.findIndex((note) => note._id === id)
			state.notes.splice(idx, 1)
		},
		addNote(state, { note }) {
			state.notes.unshift(note)
		},
		editNote(state, { note }) {
			const idx = state.notes.findIndex((n) => n._id === note._id)
			state.notes.splice(idx, 1, note)
		},
		setFilter(state, { filterBy }) {
			state.filter = filterBy
		},
	},
	actions: {
		async loadNotes({ commit }) {
			try {
				const board = await noteService.query()
				commit({ type: 'setNotes', notes: board[0].noteList })
			} catch (err) {
				console.log('cannot load notes')
			}
		},
		async removeNote({ commit }, { id }) {
			try {
				await noteService.remove(id)
				commit({ type: 'removeNote', id })
			} catch (err) {
				console.log('cannot remove note')
			}
		},
		async saveNote({ commit }, { note }) {
			let type = note._id ? 'editNote' : 'addNote'
			try {
				const savedNote = await noteService.save(note)
				commit({ type: type, note: savedNote })
			} catch (err) {
				console.log('cannot save note')
			}
		},
		async setFilterBy({ commit, dispatch }, { filterBy }) {
			commit({ type: 'setFilter', filterBy })
			dispatch({ type: 'loadNotes' })
		},
		async getById({ commit }, { id }) {
			try {
				const note = await noteService.getById(id)
				return note
			} catch (err) {
				console.log('cannot get note')
			}
		},
	},
}
