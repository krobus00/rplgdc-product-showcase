const routes = [
	{
		path: '/',
		component: () => import('layouts/MainLayout.vue'),
		children: [
			{
				path: '',
				component: () => import('pages/Index.vue'),
				meta: {
					title: 'HOMEPAGE',
				},
			},
		],
	},
	{
		path: '/login',
		component: () => import('pages/Login.vue'),
		meta: {
			title: 'LOGIN',
		},
	},
	{
		path: '/regis',
		component: () => import('pages/Register.vue'),
		meta: {
			title: 'REGISTRATION',
		},
	},
	{
		path: '/product/:username/:title',
		component: () => import('layouts/MainLayout.vue'),
		children: [
			{
				path: '',
				component: () => import('pages/ProductView.vue'),
				meta: {requiresAuth: false},
			},
		],
	},
	{
		path: '/explore/:type',
		component: () => import('layouts/MainLayout.vue'),
		children: [
			{
				path: '',
				component: () => import('pages/Explore.vue'),
				meta: {requiresAuth: false},
			},
		],
	},
	{
		path: '/search/:type/:title',
		component: () => import('layouts/MainLayout.vue'),
		children: [
			{
				path: '',
				component: () => import('pages/Search.vue'),
				meta: {requiresAuth: false},
			},
		],
	},
	{
		path: '/myproduct',
		component: () => import('pages/MyProduct.vue'),
		meta: {requiresAuth: true},
	},
	{
		path: '/addproduct/:type',
		component: () => import('pages/AddProduct.vue'),
		meta: {requiresAuth: true},
	},
	{
		path: '/updateproduct/:username/:title',
		component: () => import('pages/UpdateProduct.vue'),
		meta: {requiresAuth: true},
	},
	{
		path: '/admin/dashboard',
		component: () => import('pages/Dashboard.vue'),
		meta: {requiresAuth: true, admin: true},
	},
	{
		path: '/admin/product',
		component: () => import('pages/dashboard/dashboardProduct.vue'),
		meta: {requiresAuth: true, admin: true},
	},
	{
		path: '/admin/user',
		component: () => import('pages/dashboard/dashboardUser.vue'),
		meta: {requiresAuth: true, admin: true},
	},
	{
		path: '/editprofile',
		component: () => import('pages/EditProfile.vue'),
		meta: {requiresAuth: true},
	},
	{
		path: '*',
		component: () => import('pages/Error404.vue'),
	},
]
export default routes
