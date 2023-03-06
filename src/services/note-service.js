//WITHOUT BACKEND
// import { storageService } from './storage.service.js'
// import { boardService } from './board-service.js'
// import { userService } from './user-service.js'

//WITH BACKEND
import { httpService } from './http.service.js'
const prmStr = 'note'

export const noteService = {
	query,
	remove,
	save,
	getEmptyNote,
	getById,
}

async function query() {
	// console.log('not in use')
	// return storageService.query(NOTE_KEY)

	//WITH SERVER
	return await httpService.get(prmStr)
}

async function getById(id) {
	// const board = await boardService.query()
	// const noteList = board[0].noteList
	// const note = noteList.find((note) => note._id === id)
	// return note

	//WITH SERVER
	const note = await httpService.get(`${prmStr}/${id}`)
	return note
}

async function remove(id) {
	// const board = await boardService.query()
	// const noteList = board[0].noteList
	// const idx = noteList.findIndex((n) => n._id === id)
	// noteList.splice(idx, 1)
	// boardService.save(board[0])

	//WITH SERVER
	return await httpService.delete(`${prmStr}/${id}`)
}

async function save(note) {
	// const board = await boardService.query()
	// const noteList = board[0].noteList

	if (note._id) {
		// const idx = noteList.findIndex((n) => n._id === note._id)
		// noteList.splice(idx, 1, note)
		// boardService.save(board[0])
		// return note

		//WITH SERVER
		return await httpService.put(`${prmStr}/${note._id}`, note)
	} else {
		// note._id = _makeId(10)
		// noteList.unshift(note)
		// boardService.save(board[0])
		// return note

		//WITH SERVER
		note._id = _makeId(10)
		return await httpService.post(prmStr, note)
	}
}

function getEmptyNote() {
	return {
		_id: '',
		type: 'txt',
		isPinned: false,
		bgClr: '#ffffff',
		bgImg: '',
		info: {
			title: '',
			imgs: [],
		},
		location: 'notes',
		labels: [],
	}
}

function _makeId(length = 8) {
	var text = ''
	var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	for (var i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length))
	}
	return text
}
