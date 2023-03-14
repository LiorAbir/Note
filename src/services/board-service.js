//WITHOUT BACKEND
// import { storageService } from './storage.service.js'
// import { userService } from './user-service.js'
// const BOARD_KEY = 'board-DB'
// _createBoards()

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
	// const loggedinUser = userService.getLoggedinUser()
	// const boards = await storageService.query(BOARD_KEY)
	// const userBoards = boards.filter((board) => {
	// 	return board.userId === loggedinUser._id
	// })
	// return userBoards

	//WITH SERVER
	return await httpService.get(prmStr)
}

async function getById(id) {
	// await storageService.query(BOARD_KEY, id)

	//WITH SERVER
	const board = await httpService.get(`${prmStr}/${id}`)
	return board
}

async function remove(id) {
	// return storageService.remove(BOARD_KEY, id)

	//WITH SERVER
	return await httpService.delete(`${prmStr}/${id}`)
}

async function save(board) {
	if (board._id) {
		// return storageService.put(BOARD_KEY, board)

		//WITH SERVER
		return await httpService.put(`${prmStr}/${board._id}`, board)
	} else {
		// board._id = _makeId(10)
		// return storageService.post(BOARD_KEY, board)

		//WITH SERVER
		return await httpService.post(prmStr, board)
	}
}

function getEmptyBoard() {
	return {
		userId: '',
		labels: [],
		noteList: [],
		noteOrder: [],
	}
}

//WITH DUMMY BACKEND
function _createBoards() {
	let boards = JSON.parse(localStorage.getItem(BOARD_KEY))
	if (!boards || !boards.length) {
		boards = _getBoards()
		localStorage.setItem(BOARD_KEY, JSON.stringify(boards))
	}
	return boards
}

function _getBoards() {
	return [
		{
			_id: 'board1',
			userId: 'user1',
			labels: ['Important'],
			noteOrder: [],
			noteList: [
				{
					_id: 'note1',
					type: 'txt',
					location: 'notes',
					labels: [],
					isPinned: false,
					info: {
						title: 'Todo',
						txt: 'Do..',
						imgs: [],
					},
					bgImg: '',
					bgClr: '#fff475',
				},
				{
					_id: 'note2',
					type: 'txt',
					location: 'notes',
					labels: [],
					isPinned: false,
					info: {
						title: 'Remember',
						txt: 'remember',
						imgs: [],
					},
					bgImg: '',
					bgClr: '#ffffff',
				},
				{
					_id: 'note3',
					type: 'txt',
					location: 'notes',
					labels: ['Important'],
					isPinned: false,
					info: {
						title: 'Important',
						txt: 'important',
						imgs: [],
					},
					bgImg: '',
					bgClr: '#f28b82',
				},
				{
					_id: 'note4',
					type: 'txt',
					location: 'notes',
					labels: [],
					isPinned: false,
					info: {
						title: 'Trip',
						txt: 'trip to...',
						imgs: [
							'http://res.cloudinary.com/lior-cloud/image/upload/v1677080121/photo-1600590536897-dd4b3ece9594_qbahdh.avif',
							'http://res.cloudinary.com/lior-cloud/image/upload/v1677080269/photo-1582919534700-acf2374f10d3_wfhozi.avif',
						],
					},
					bgImg: '',
					bgClr: '#ccff90',
				},
			],
		},
	]
}

function _makeId(length = 8) {
	var text = ''
	var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	for (var i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length))
	}
	return text
}
