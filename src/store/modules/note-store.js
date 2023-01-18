import { noteService } from '../../services/note-service.js'

export default {
	state: {
		notes: null,
		noteInfo: null,
		filter: {
			txt: '',
		},
	},
	getters: {
		notes(state) {
			return state.notes
		},
		notesToDisplay(state) {
			let { txt } = state.filter
			if (!txt) return state.notes

			const regexTst = new RegExp(txt, 'i')

			let filteredNotes = state.notes.filter((note) => {
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

			console.log(filteredNotes)
			return filteredNotes
		},
		emptyNote() {
			return noteService.getEmptyNote()
		},
	},
	mutations: {
		setNotes(state, { notes }) {
			state.notes = notes.noteList
			state.noteInfo = notes
		},
		removeNote(state, { id }) {
			const idx = state.notes.findIndex((note) => note._id === id)
			state.notes.splice(idx, 1)
		},
		addNote(state, { note }) {
			console.log(note)
			state.notes.unshift(note)
		},
		editNote(state, { note }) {
			const idx = state.notes.findIndex((n) => n._id === note._id)
			state.notes.splice(idx, 1, note)
		},
		setFilter(state, { filterBy }) {
			state.filter = filterBy
			console.log(state.filter)
		},
	},
	actions: {
		async loadNotes({ commit }) {
			console.log('load')
			try {
				const notes = await noteService.query()
				commit({ type: 'setNotes', notes: notes[0] })
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
		async setFilterBy({ commit }, { filterBy }) {
			const copyFilter = JSON.parse(JSON.stringify(filterBy))
			commit({ type: 'setFilter', filterBy: copyFilter })
		},
	},
}
