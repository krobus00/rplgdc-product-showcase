<template>
	<q-page-container>
		<normalNavbar></normalNavbar>
		<b-container class="mt-5" v-if="msg != ''">
			<h1 class="text-center">{{ msg }}</h1>
		</b-container>
		<b-container class="mt-5" v-else-if="detailProduct.type_title == 'game'">
			<GameProductView :detail="detailProduct" :media="mediaProduct"></GameProductView>
		</b-container>
		<b-container class="mt-5" v-else-if="detailProduct.type_title == 'design'">
			<DesignProductView :detail="detailProduct" :media="mediaProduct"></DesignProductView>
		</b-container>
		<b-container class="mt-5" v-else-if="detailProduct.type_title == 'sound'">
			<SoundProductView :detail="detailProduct" :media="mediaProduct"></SoundProductView>
		</b-container>
		<b-container class="mt-5" v-else>
			<NormalProductView :detail="detailProduct" :media="mediaProduct"></NormalProductView>
		</b-container>
		<b-container class="mt-2">
			<h2>Produk lainnya</h2>
			<b-row class="my-1">
				<b-col cols="12" sm="6" md="4" lg="3" :key="index" v-for="(item, index) in products">
					<product-card :title="item.product_title" :type="item.type_title" :username="item.username" :thumbnail="env.BASE_URL + env.MEDIA_URL + item.product_thumbnail"></product-card>
				</b-col>
			</b-row>
		</b-container>
	</q-page-container>
</template>

<script>
import normalNavbar from 'components/normalNavbar.vue'
import NormalProductView from 'components/productView/NormalProductView'
import DesignProductView from 'components/productView/DesignProductView'
import SoundProductView from 'components/productView/SoundProductView'
import GameProductView from 'components/productView/GameProductView'
import ProductCard from 'components/ProductCard.vue'
export default {
	components: {
		normalNavbar,
		NormalProductView,
		DesignProductView,
		SoundProductView,
		GameProductView,
		ProductCard,
	},
	name: 'ProductView',
	data() {
		return {
			username: this.$route.params.username,
			title: this.$route.params.title,
			msg: '',
			detailProduct: {},
			mediaProduct: {},
			products: [],
		}
	},
	watch: {
		'$route.params.title': function(id) {
			this.title = this.$route.params.title
			this.username = this.$route.params.username
			this.$q.loading.show()
			this.load()
		},
	},
	mounted() {
		this.$q.loading.show()
		this.load()
		this.other()
	},
	computed: {
		env() {
			return process.env.data
		},
	},
	methods: {
		load() {
			this.$axios
				.get('product/' + this.username + '/' + this.title)
				.then((res) => {
					if (!res.data.error) {
						this.msg = res.data.msg
						this.detailProduct = res.data.data.detail[0]
						if (res.data.data.media) this.mediaProduct = res.data.data.media
						this.$q.loading.hide()
					}
				})
				.catch((err) => {
					this.$q.loading.hide()
					console.log(err)
				})
		},
		other() {
			this.$axios
				.get('product/listshowcase')
				.then((res) => {
					if (!res.data.error) {
						this.products = res.data.data.products
						this.$q.loading.hide()
					}
				})
				.catch((err) => {
					this.$q.loading.hide()
					console.log(err)
				})
		},
	},
}
</script>
