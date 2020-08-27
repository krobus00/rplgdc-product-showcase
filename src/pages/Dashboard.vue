<template>
	<q-layout>
		<q-page-container>
			<dashboardNavbar></dashboardNavbar>
			<b-container class="mt-5">
				<div class="row">
					<div class="col-md-4">
						<div class="card-box">
							<i class="icon-layers float-right text-muted"></i>
							<h6 class="text-muted text-uppercase mt-0">Produk</h6>
							<h2>{{ products }}</h2>
						</div>
					</div>
					<div class="col-md-4">
						<div class="card-box">
							<i class="icon-layers float-right text-muted"></i>
							<h6 class="text-muted text-uppercase mt-0">Tipe produk</h6>
							<h2>{{ types }}</h2>
						</div>
					</div>
					<div class="col-md-4">
						<div class="card-box">
							<i class="icon-layers float-right text-muted"></i>
							<h6 class="text-muted text-uppercase mt-0">User</h6>
							<h2>{{ users }}</h2>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-md-6">
						<h4>Produk terbaru</h4>
						<b-table striped hover :items="table_products" :fields="field_products"></b-table>
					</div>
					<div class="col-md-6">
						<h4>User terbaru</h4>
						<b-table striped hover :items="table_users" :fields="field_users"></b-table>
					</div>
				</div>
			</b-container>
		</q-page-container>
	</q-layout>
</template>

<script>
import dashboardNavbar from 'components/dashboardNavbar.vue'
export default {
	components: {
		dashboardNavbar,
	},
	name: 'Dashboard',
	data() {
		return {
			users: 0,
			types: 0,
			products: 0,

			message: '',
			table_products: [],
			field_products: [
				{
					key: 'product_title',
					label: 'Judul Produk',
					sortable: true,
				},
			],
			field_users: [
				{
					key: 'name',
					label: 'Nama',
					sortable: true,
				},
			],
			table_users: [],
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
		// pageCount() {
		// 	let l = this.totalRows,
		// 		s = this.perPage
		// 	return Math.floor(l / s)
		// },
		// currentPageItems() {
		// 	let lengthAll = this.items.length
		// 	this.nbPages = 0
		// 	for (let i = 0; i < lengthAll; i = i + this.perPage) {
		// 		this.paginated_items[this.nbPages] = this.items.slice(i, i + this.perPage)
		// 		this.nbPages++
		// 	}
		// 	window.scrollTo(0, 0)
		// 	return this.paginated_items[this.currentPage - 1]
		// },
	},
	methods: {
		top() {
			window.scrollTo(0, 0)
		},
		load() {
			// this.$axios
			// 	.get('product/listall')
			// 	.then((res) => {
			// 		if (res.data.data.products) {
			// 			this.items = res.data.data.products
			// 			this.totalRows = res.data.data.products.length
			// 		}
			// 		this.message = res.data.msg
			// 		this.$q.loading.hide()
			// 	})
			// 	.catch((err) => {
			// 		this.$q.loading.hide()
			// 	})
			this.$axios
				.get('admin/dashboard')
				.then((res) => {
					if (!res.data.error) {
						this.products = res.data.data.products.total
						this.types = res.data.data.types.total
						this.users = res.data.data.users.total
						this.table_users = res.data.data.users.data
						this.table_products = res.data.data.products.data
					}
					this.message = res.data.msg
					this.$q.loading.hide()
				})
				.catch((err) => {
					this.$q.loading.hide()
				})
		},
	},
}
</script>
