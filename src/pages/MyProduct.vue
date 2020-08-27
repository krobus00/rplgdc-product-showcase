<template>
	<q-layout>
		<q-page-container>
			<normalNavbar></normalNavbar>
			<h1 class="text-center m-3">Produk saya</h1>
			<b-container>
				<b-dropdown id="dropdown-1" text="Tambah produk" variant="primary">
					<b-dropdown-item v-for="option in type" :key="option.type_title" :value="option.type_title" @click="addProduct(option.type_title)">
						{{ option.type_title }}
					</b-dropdown-item>
				</b-dropdown>
				<b-row>
					<b-col sm="12" md="3" class="my-1">
						<b-form inline>
							<label class="mr-sm-2" for="inline-form-custom-select-pref">Show</label>
							<b-form-select v-model="perPage" id="perPageSelect" size="sm" :options="pageOptions"></b-form-select>
						</b-form>
					</b-col>
					<b-col sm="12" md="4" class="my-1 ml-auto">
						<b-form inline>
							<label class="mr-sm-2" for="inline-form-custom-select-pref">Cari</label>
							<b-form-input v-model="filter" size="sm" id="filterInput" placeholder="Ketik judul"></b-form-input>
						</b-form>
					</b-col>
				</b-row>

				<b-table :filter-included-fields="['product_title']" show-empty responsive hover :items="items" :fields="field" :current-page="currentPage" :per-page="perPage" :filter="filter" @filtered="onFiltered">
					<template v-slot:cell(action)="row">
						<b-button variant="danger" @click="confirmDelete(row.item, row.index, $event.target)" size="sm" class="mr-1 mb-1">
							<v-icon name="trash" scale="1" />
						</b-button>
						<router-link :to="'/updateproduct/' + username + '/' + row.item.product_title">
							<b-button variant="primary" size="sm" class="mr-1 mb-1">
								<v-icon name="edit" scale="1" />
							</b-button>
						</router-link>
						<router-link :to="'/product/' + username + '/' + row.item.product_title">
							<b-button variant="success" size="sm" class="mr-1 mb-1">
								<v-icon name="search" scale="1" />
							</b-button>
						</router-link>
					</template>
					<template v-slot:cell(takedown_reason)="row">
						<strong :class="'text-' + (row.value == 'BANNED' ? 'danger' : 'normal')">{{ row.value }}</strong>
					</template>
				</b-table>
				<b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="mb-5" align="left" />
			</b-container>
		</q-page-container>
	</q-layout>
</template>

<script>
import normalNavbar from 'components/normalNavbar.vue'
export default {
	components: {
		normalNavbar,
	},
	name: 'MyProduct',
	data() {
		return {
			field: [
				{
					key: 'product_title',
					label: 'Judul Produk',
					sortable: true,
				},
				{
					key: 'product_created',
					label: 'Tanggal rilis',
					formatter: (value, key, item) => {
						return value ? this.dateFormmat(value) : '-'
					},
					sortable: true,
				},
				{
					key: 'product_updated',
					label: 'Update terakhir',
					formatter: (value, key, item) => {
						return value ? this.dateFormmat(value) : '-'
					},
					sortable: true,
					// Variant applies to the whole column, including the header and footer
					// variant: 'danger',
				},
				{
					key: 'takedown_reason',
					label: 'Status',
					formatter: (value, key, item) => {
						return value ? 'BANNED' : 'AKTIF'
					},
					sortable: true,
					sortByFormatted: true,
				},
				{
					key: 'action',
				},
			],
			type: [],
			items: [],
			username: '',
			totalRows: 1,
			currentPage: 1,
			perPage: 5,
			pageOptions: [5, 10, 15],
			sortBy: '',
			sortDesc: false,
			sortDirection: 'asc',
			filter: null,
		}
	},
	mounted() {
		this.load()
	},
	methods: {
		addProduct(type) {
			this.$router.push('/addproduct/' + type)
		},
		confirmDelete(item, index, button) {
			this.$swal({
				title: 'Menghapus produk',
				input: 'textarea',
				showCloseButton: true,
				showCancelButton: true,
				inputPlaceholder: 'Alasan penghapusan produk',
				confirmButtonText: 'Hapus',
				cancelButtonText: 'Batal',
				inputValidator: (value) => {
					if (!value && value.length < 5) {
						return 'Isi alasan minimal 5 karakter'
					}
				},
			}).then((result) => {
				if (result.value) {
					this.$axios
						.put('product/delete', {
							product_id: item.product_id,
							reason: result.value,
						})
						.then((del) => {
							if (del.data.error) {
								this.$swal({
									title: 'Produk gagal dihapus',
									icon: 'error',
								})
							} else {
								this.$swal('Deleted', item.product_title + ' berhasil dihapus', 'success')
								this.load()
							}
						})
				}
			})
		},
		dateFormmat(d) {
			let current_datetime = new Date(d)
			return current_datetime.getDate() + '-' + (current_datetime.getMonth() + 1) + '-' + current_datetime.getFullYear() + ' ' + current_datetime.getHours() + ':' + current_datetime.getMinutes() + ':' + current_datetime.getSeconds()
		},
		load() {
			this.$axios
				.get('product/myproduct')
				.then((res) => {
					if (!res.data.error) {
						this.items = res.data.data.products
						this.username = res.data.data.username
						this.totalRows = res.data.data.products.length
					}
				})
				.catch((err) => {
					this.$q.loading.hide()
					console.log(err)
				})
			this.$axios
				.get('category/list')
				.then((res) => {
					if (!res.data.error) {
						this.type = res.data.data.type
					}
				})
				.catch((err) => {
					console.log(err)
				})
		},
		onFiltered(filteredItems) {
			// Trigger pagination to update the number of buttons/pages due to filtering
			this.totalRows = filteredItems.length
			this.currentPage = 1
		},
	},
}
</script>
