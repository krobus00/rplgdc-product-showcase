import Vue from 'vue'
import axios from 'axios'
const instance = axios.create({
	baseURL: process.env.data.BASE_URL + 'api/',
})
instance.interceptors.request.use(
	function(config) {
		let user = JSON.parse(localStorage.getItem('user'))
		if (user) {
			config.headers['Authorization'] = `Bearer ${user}`
		}
		return config
	},
	function(error) {
		return Promise.reject(error)
	},
)
instance.interceptors.response.use((response) => {
	return response
})
Vue.prototype.$axios = instance
export default instance
