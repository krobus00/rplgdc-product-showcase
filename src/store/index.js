import Vue from 'vue'
import Vuex from 'vuex'
import {auth} from './auth.module'
import VeeValidate from 'vee-validate'

Vue.use(Vuex)
Vue.use(VeeValidate, {fieldsBagName: 'formFields'})

export default function() {
	const Store = new Vuex.Store({
		modules: {
			auth,
		},
		namespaced: true,
		// strict: process.env.DEV,
		strict: false,
	})

	return Store
}
