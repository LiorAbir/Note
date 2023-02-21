//DAMMY BACEND
// import { storageService } from './storage.service'
// import { boardService } from './board-service'
// const LOGGEDIN_KEY = 'loggedinUser'
// const USERS_KEY = 'users-DB'
// _createUsers()

//BACKEND
import { httpService } from './http.service'
const LOGGEDIN_KEY = 'loggedinUser'
const prmStr = 'auth'

export const userService = {
	login,
	logout,
	signUp,
	getLoggedinUser,
	updateUser,
	getById,
	removeUser,
}

async function login(credentials) {
	// const users = await storageService.query(USERS_KEY)
	// const user = users.find(
	// 	(user) =>
	// 		user.username === credentials.username &&
	// 		user.password === credentials.password
	// )
	// if (!user) return Promise.reject('No user')
	// return _saveLocalUser(user)

	//backend
	const user = await httpService.post(`${prmStr}/login`, credentials)
	if (user) return _saveLocalUser(user)
}

async function logout() {
	// sessionStorage.removeItem(LOGGEDIN_KEY)

	//backend
	return await httpService.post(`${prmStr}/logout`)
}

async function signUp(signupInfo) {
	// const { fullname, username, email, password } = signupInfo
	// const users = await storageService.query(USERS_KEY)

	// if (!username || !password || !fullname || !email)
	// 	return Promise.reject('Missing required signup information')

	// //Check if user exist
	// const userExist = users.find((user) => user.username === username)
	// if (userExist) return Promise.reject('Username already taken')

	// //Add user and board to user
	// const savedUser = await _addUser(signupInfo)
	// login({ username, password })

	// const newBoard = {
	// 	userId: savedUser._id,
	// 	labels: [],
	// 	noteOrder: [],
	// 	noteList: [],
	// }
	// boardService.save(newBoard)
	// return savedUser

	//backend
	const user = await httpService.post(`${prmStr}/signup`, signupInfo)
	return _saveLocalUser(user)
}

function getLoggedinUser() {
	return JSON.parse(sessionStorage.getItem(LOGGEDIN_KEY) || 'null')
}

async function _addUser({ fullname, username, email, password }) {
	const user = {
		_id: _makeId(),
		fullname,
		username,
		email,
		password,
	}

	await storageService.post(USERS_KEY, user)
	return _saveLocalUser(user)
}

async function updateUser(user) {
	// user = await storageService.put(USERS_KEY, user)

	user = await httpService.put(`user/${user._id}`, user)

	if (getLoggedinUser._id === user._id) _saveLocalUser(user)
	return user
}

async function getById(userId) {
	// const user = await storageService.get(USERS_KEY, userId)
	const user = await httpService.get(`user/${userId}`)
	return user
}

function removeUser(userId) {
	// return storageService.remove(USERS_KEY, userId)
	return httpService.delete(`user/${userId}`)
}

function _saveLocalUser(user) {
	sessionStorage.setItem(LOGGEDIN_KEY, JSON.stringify(user))
	return user
}

//WITH DUMMY BACKEND
function _createUsers() {
	let users = JSON.parse(localStorage.getItem(USERS_KEY))
	if (!users || !users.length) {
		users = _getUsers()
		localStorage.setItem(USERS_KEY, JSON.stringify(users))
	}
	return users
}

function _getUsers() {
	return [
		{
			_id: 'user1',
			fullname: 'guest',
			username: 'guest',
			email: 'guest@gmail.com',
			password: 'guest1234',
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
