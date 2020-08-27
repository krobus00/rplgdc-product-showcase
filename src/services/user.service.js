import axios from '../boot/axios'
class UserService {
	async getTokenInfo() {
		return await axios.get('user/info')
	}
}

export default new UserService()
