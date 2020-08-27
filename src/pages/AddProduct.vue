<template>
	<q-layout>
		<q-page-container>
			<normalNavbar></normalNavbar>
			<b-container class="mt-5" v-if="msg != ''">
				<h1 class="text-center">{{ msg }}</h1>
			</b-container>
			<b-container class="mt-5" v-else-if="type == 'game' || type == 'web' || type == 'mobile' || type == 'bot'">
				<Normal :typeinfo="typeinfo"></Normal>
			</b-container>
			<b-container class="mt-5" v-else-if="type == 'design'">
				<Design :typeinfo="typeinfo"></Design>
			</b-container>
			<b-container class="mt-5" v-else-if="type == 'sound'">
				<Sound :typeinfo="typeinfo"></Sound>
			</b-container>
		</q-page-container>
	</q-layout>
</template>

<script>
import normalNavbar from 'components/normalNavbar.vue'
import Normal from 'components/productForm/Normal.vue'
import Design from 'components/productForm/Design.vue'
import Sound from 'components/productForm/Sound.vue'
export default {
	components: {
		normalNavbar,
		Normal,
		Design,
		Sound,
	},
	name: 'AddProduct',
	data() {
		return {
			type: this.$route.params.type,
			typeinfo: '',
			msg: '',
			detailProduct: {},
			mediaProduct: {},
			products: [],
		}
	},
	watch: {
		'$route.params.type': function(id) {
			this.type = this.$route.params.type
			this.$q.loading.show()
			this.load()
		},
	},
	mounted() {
		// this.$q.loading.show()
		this.load()
		// this.other()
	},
	computed: {
		env() {
			return process.env.data
		},
	},
	methods: {
		load() {
			this.$axios
				.get('category/info/' + this.type)
				.then((res) => {
					if (!res.data.error) {
						this.typeinfo = res.data.data[0]
					}
				})
				.catch((err) => {
					console.log(err)
				})
		},
		// other() {
		// 	this.$axios
		// 		.get('product/listshowcase')
		// 		.then((res) => {
		// 			if (!res.data.error) {
		// 				this.products = res.data.data.products
		// 				this.$q.loading.hide()
		// 			}
		// 		})
		// 		.catch((err) => {
		// 			this.$q.loading.hide()
		// 			console.log(err)
		// 		})
		// },
	},
}
</script>
