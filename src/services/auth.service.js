import axios from '../boot/axios'
class AuthService {
	async login(user) {
		const response = await axios.post('user/login', {
			username: user.username,
			password: user.password,
		})
		if (response.data.data.accessToken) {
			localStorage.setItem('user', JSON.stringify(response.data.data.accessToken))
		}
		return response.data
	}

	logout() {
		localStorage.removeItem('user')
	}

	async register(user) {
		const response = await axios.post('user/register', {
			username: user.username,
			nim: user.nim,
			email: user.email,
			password: user.password,
		})
		return response.data
	}
	async getUserInfo() {
		const response = await axios.get('user/info')
		return response.data
	}
}

export default new AuthService()
