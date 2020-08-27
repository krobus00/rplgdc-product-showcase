import Vue from 'vue'
import VueRouter from 'vue-router'
import {BootstrapVue, BootstrapVueIcons} from 'bootstrap-vue'
import {VueMasonryPlugin} from 'vue-masonry'
import VueImg from 'v-img'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-awesome/icons/flag'

// or import all icons if you don't care about bundle size
import 'vue-awesome/icons'

/* Register component with one of 2 methods */

import Icon from 'vue-awesome/components/Icon'

// globally (in your main .js file)
Vue.component('v-icon', Icon)
import VueSweetalert2 from 'vue-sweetalert2'

Vue.use(VueSweetalert2)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(VueMasonryPlugin)
const vueImgConfig = {
	// Consider alt of image as its title in gallery?
	altAsTitle: false,
}
Vue.use(VueImg, vueImgConfig)
import routes from './routes'
import store from '../store'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function(/* { store, ssrContext } */) {
	const Router = new VueRouter({
		scrollBehavior: () => ({x: 0, y: 0}),
		routes,

		// Leave these as they are and change in quasar.conf.js instead!
		// quasar.conf.js -> build -> vueRouterMode
		// quasar.conf.js -> build -> publicPath
		mode: process.env.VUE_ROUTER_MODE,
		base: process.env.VUE_ROUTER_BASE,
	})
	const DEFAULT_TITLE = 'RPLGDC'
	Router.beforeEach(async (to, from, next) => {
		Vue.nextTick(() => {
			document.title = (to.meta.title ? to.meta.title + ' - ' : '') + 'RPLGDC'
		})

		let user = JSON.parse(localStorage.getItem('user'))

		if (user) {
			store().dispatch('auth/getUserInfo')
		}
		if (to.meta.requiresAuth) {
			const loggedIn = localStorage.getItem('user')
			if (!loggedIn) {
				next({
					path: '/login',
					query: {redirect: to.fullPath},
				})
			} else {
				if (to.meta.admin) {
					let data = await store().state.auth.info
					if (!data.userData.admin) {
						next({
							path: '/',
						})
					}
				}
				next()
			}
		} else {
			next()
		}
	})
	return Router
}
