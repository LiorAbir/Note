import { boardService } from '../../services/board-service'

export default {
	state: {
		board: null,
	},
	getters: {
		board(state) {
			return state.board
		},
	},
	mutations: {
		setBoard(state, { board }) {
			state.board = board
		},
		updateBoard(state, { board }) {
			state.board = board
		},
	},
	actions: {
		async loadBoard({ commit }) {
			try {
				const board = await boardService.query()
				commit({ type: 'setBoard', board: board[0] })
				commit({ type: 'setNotes', notes: board[0].noteList })
			} catch (err) {
				console.log('Cannot load board')
			}
		},
		async saveBoard({ commit }, { board }) {
			// let type = board._id ? 'editNote' : 'addNote'
			console.log(board)
			// try {
			// 	const savedBoard = await boardService.save(board)
			// 	commit({ type: 'updateBoard', board: savedNote })
			// } catch (err) {
			// 	console.log('cannot save note')
			// }
		},
	},
}
