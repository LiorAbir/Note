//WITHOUT BACKEND
// import { storageService } from './storage.service.js'
// const BOARD_KEY = 'board_DB'
// _createBoard()

//WITH BACKEND
import { httpService } from './http.service.js'
const prmStr = 'board'

export const boardService = {
	query,
	remove,
	save,
	getById,
	getEmptyBoard,
}

async function query() {
	// return storageService.query(BOARD_KEY)

	//WITH SERVER
	return await httpService.get(prmStr)
}

async function getById(id) {
	// return storageService.get(BOARD_KEY, id)

	//WITH SERVER
	const board = await httpService.get(`${prmStr}/${id}`)
	return board
}

async function remove(id) {
	// return storageService.remove(NOTE_KEY, id)

	//WITH SERVER
	return await httpService.delete(`${prmStr}/${id}`)
}

async function save(board) {
	if (board._id) {
		// return storageService.put(NOTE_KEY, note)

		//WITH SERVER
		return await httpService.put(`${prmStr}/${board._id}`, board)
	} else {
		// return storageService.post(NOTE_KEY, note)

		//WITH SERVER
		// board._id = _makeId(10)
		return await httpService.post(prmStr, board)
	}
}

function getEmptyBoard() {
	return {
		userId: '',
		labels: [],
		noteList: [],
	}
}

function _createBoard() {
	console.log('hh')
}
