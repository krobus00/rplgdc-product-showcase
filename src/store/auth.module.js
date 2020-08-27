import AuthService from '../services/auth.service'

const token = JSON.parse(localStorage.getItem('user'))
const initialState = token ? {status: {loggedIn: true}, info: {token: token, userData: {}}} : {status: {loggedIn: false}, info: {token: token, userData: {}}}

export const auth = {
	namespaced: true,
	state: initialState,
	actions: {
		login({commit}, user) {
			return AuthService.login(user).then(
				(user) => {
					if (user.error) {
						commit('loginFailure')
						return Promise.reject(user)
					} else {
						commit('loginSuccess', user)
						return Promise.resolve(user)
					}
				},
				(error) => {
					commit('loginFailure')
					return Promise.reject('server error')
				},
			)
		},
		logout({commit}) {
			AuthService.logout()
			commit('logout')
		},
		register({commit}, user) {
			return AuthService.register(user).then(
				(user) => {
					if (user.error) {
						commit('registerFailure')
						return Promise.reject(user)
					} else {
						commit('registerSuccess')
						return Promise.resolve(user)
					}
				},
				(error) => {
					commit('registerFailure')
					return Promise.reject('server error')
				},
			)
		},
		getUserInfo({commit}) {
			return AuthService.getUserInfo().then(
				(result) => {
					if (result.error) {
						AuthService.logout()
						commit('logout')
						return Promise.resolve(result)
					} else {
						commit('getInfo', result.data)
						return Promise.resolve(result)
					}
				},
				(error) => {
					AuthService.logout()
					commit('logout')
					return Promise.reject('server error')
				},
			)
		},
	},
	mutations: {
		loginSuccess(state, user) {
			state.status.loggedIn = true
			state.info.token = user.data.accessToken
			state.info.userData = user.data.userData
		},
		loginFailure(state) {
			state.status.loggedIn = false
			state.info.token = null
			state.info.userData = {}
		},
		logout(state) {
			state.status.loggedIn = false
			state.info.token = null
			state.info.userData = {}
		},
		registerSuccess(state) {
			state.status.loggedIn = false
			state.info.token = null
			state.info.userData = {}
		},
		registerFailure(state) {
			state.status.loggedIn = false
			state.info.token = null
			state.info.userData = {}
		},
		getInfo(state, info) {
			state.info.userData = info
		},
	},
}
