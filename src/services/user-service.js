//DAMMY BACEND
// import { storageService } from './storage.service'
const LOGGEDIN_KEY = 'loggedinUser'
// const USERS_KEY = 'users_DB'
// _createUsers()

//BACKEND
import { httpService } from './http.service'
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
	// const user = users.find((user) => user.username === credentials.username)
	// return _saveLocalUser(user)

	const user = await httpService.post(`${prmStr}/login`, credentials)
	if (user) return _saveLocalUser(user)
}

async function logout() {
	sessionStorage.removeItem(LOGGEDIN_KEY)
	return await httpService.post(`${prmStr}/logout`)
}

async function signUp(signupInfo) {
	// const { fullName, username, email, password } = signupInfo
	// const user = {
	// 	_id: _makeId(),
	// 	fullName,
	// 	username,
	// 	email,
	// 	password,
	// notesId,
	// }

	// const user = await storageService.post(USERS_KEY)
	// return _saveLocalUser(user)

	const user = await httpService.post(`${prmStr}/signup`, signupInfo)
	return _saveLocalUser(user)
}

function getLoggedinUser() {
	return JSON.parse(sessionStorage.getItem(LOGGEDIN_KEY) || 'null')
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
			id: 'user1',
			fullName: 'Lior Abir',
			username: 'liorabir',
			email: 'liorabir@gmail.com',
			password: '123456',
			isAdmin: true,
			notesId: '',
		},
	]
}
