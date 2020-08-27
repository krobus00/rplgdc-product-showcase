<template>
	<q-page-container>
		<normalNavbar></normalNavbar>
		<div class="mt-3">
			<div v-if="message">
				<h1 class="text-center">{{ message }}</h1>
			</div>
			<div v-else>
				<b-container>
					<h1 class="mb-5">Hasil pencarian : {{ title }}</h1>
					<b-row class="my-1">
						<b-col cols="12" sm="6" md="4" lg="3" :key="index" v-for="(item, index) in currentPageItems">
							<product-card :title="item.product_title" :type="item.type_title" :username="item.username" :thumbnail="env.BASE_URL + env.MEDIA_URL + item.product_thumbnail"></product-card>
						</b-col>
					</b-row>
					<b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="mb-5" align="center" v-on:click.native="top" />
				</b-container>
			</div>
		</div>
	</q-page-container>
</template>

<script>
import normalNavbar from 'components/normalNavbar.vue'
import ProductCard from 'components/ProductCard.vue'
export default {
	components: {
		normalNavbar,
		ProductCard,
	},
	name: 'Search',
	watch: {
		'$route.params.type': function(id) {
			this.type = this.$route.params.type
			this.$q.loading.show()
			this.load()
		},
		'$route.params.title': function(id) {
			this.title = this.$route.params.title
			this.$q.loading.show()
			this.load()
		},
	},
	data() {
		return {
			title: this.$route.params.title,
			type: this.$route.params.type,
			message: '',
			items: [],
			currentPage: 1,
			perPage: 12,
			totalRows: 0,
			paginated_items: {},
			currentPageIndex: 0,
			nbPages: 0,
		}
	},
	mounted() {
		this.$q.loading.show()
		this.load()
	},
	computed: {
		env() {
			return process.env.data
		},
		pageCount() {
			let l = this.totalRows,
				s = this.perPage
			return Math.floor(l / s)
		},
		currentPageItems() {
			let lengthAll = this.items.length
			this.nbPages = 0
			for (let i = 0; i < lengthAll; i = i + this.perPage) {
				this.paginated_items[this.nbPages] = this.items.slice(i, i + this.perPage)
				this.nbPages++
			}
			window.scrollTo(0, 0)
			return this.paginated_items[this.currentPage - 1]
		},
	},
	methods: {
		top() {
			window.scrollTo(0, 0)
		},
		load() {
			this.$axios
				.get('product/search/' + this.type + '/' + this.title)
				.then((res) => {
					this.message = res.data.msg
					if (res.data.data.products) {
						this.items = res.data.data.products
						this.totalRows = res.data.data.products.length
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
