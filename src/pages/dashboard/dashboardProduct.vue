<template>
	<q-layout>
		<q-page-container>
			<dashboardNavbar></dashboardNavbar>
			<h1 class="text-center m-3">MANAJEMEN PRODUK</h1>
			<b-container>
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
						<!-- delete -->
						<b-button v-if="row.item.product_deleted" variant="success" @click="handleRestoreProduct(row.item.product_id, row.item.product_title)" size="sm" class="mr-1 mb-1">
							<v-icon name="recycle" scale="1" />
						</b-button>

						<b-button v-if="row.item.product_deleted == null" variant="danger" @click="showDeleteModal(row.item.product_id, row.item.product_title)" size="sm" class="mr-1 mb-1">
							<v-icon name="trash" scale="1" />
						</b-button>
						<!-- banned -->
						<b-button v-if="row.item.product_banned" variant="warning" @click="handleUnbannedProduct(row.item.product_id, row.item.product_title)" size="sm" class="mr-1 mb-1">
							<v-icon name="unlock" scale="1" />
						</b-button>
						<b-button v-if="row.item.product_banned == null" variant="warning" @click="showBannedModal(row.item.product_id, row.item.product_title)" size="sm" class="mr-1 mb-1">
							<v-icon name="gavel" scale="1" />
						</b-button>
						<!-- <router-link :to="'/updateproduct/' + row.item.username + '/' + row.item.product_title">
							<b-button variant="primary" size="sm" class="mr-1 mb-1">
								<v-icon name="edit" scale="1" />
							</b-button>
						</router-link> -->
						<router-link :to="'/product/' + row.item.username + '/' + row.item.product_title">
							<b-button variant="success" size="sm" class="mr-1 mb-1">
								<v-icon name="search" scale="1" />
							</b-button>
						</router-link>
					</template>
					<template v-slot:cell(status)="row">
						<strong v-if="row.item.product_deleted" class="text-warning">DELETED</strong>
						<strong v-else-if="row.item.product_banned" class="text-danger">BANNED</strong>
						<strong v-else class="text-normal">AKTIF</strong>
					</template>
				</b-table>
				<b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="mb-5" align="left" />

				<!-- modal delete -->
				<b-modal ref="deleteModal" hide-footer :title="'Menghapus ' + selectedtitle">
					<form @submit.prevent="handleDeleteProduct">
						<div class="form-group">
							<textarea class="form-control" v-model="reason" v-validate="'required|min:5'" placeholder="alasan penghapusan produk... " name="reason" rows="3"></textarea>
							<small v-if="errors.has('reason')" id="reasonHelp" class="form-text text-danger">{{ errors.first('reason') }}</small>
						</div>
						<b-row class="text-right">
							<b-col>
								<b-button class="mr-3" variant="outline-danger" @click="handleDeleteTotalProduct">Hapus total</b-button>
								<b-button type="submit" variant="danger">Hapus</b-button>
							</b-col>
						</b-row>
					</form>
				</b-modal>
				<b-modal ref="bannedModal" hide-footer :title="'Banned ' + selectedtitle">
					<form @submit.prevent="handleBannedProduct">
						<div class="form-group">
							<textarea class="form-control" v-model="reason" v-validate="'required|min:5'" placeholder="alasan banned produk... " name="reason" rows="3"></textarea>
							<small v-if="errors.has('reason')" id="reasonHelp" class="form-text text-danger">{{ errors.first('reason') }}</small>
						</div>
						<b-row class="text-right">
							<b-col><b-button type="submit" variant="danger">Banned</b-button></b-col>
						</b-row>
					</form>
				</b-modal>
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
	name: 'DashboardProduct',
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
				},
				{
					key: 'status',
					label: 'Status',
					sortable: true,
					sortByFormatted: true,
				},
				{
					key: 'action',
				},
			],
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

			selectedtitle: '',
			selectedid: '',
			productstatus: '',
			reason: '',
		}
	},
	mounted() {
		this.load()
	},
	methods: {
		handleDeleteProduct() {
			this.$validator.validateAll().then((isValid) => {
				if (!isValid) {
					return
				}
				this.$axios.put('admin/deleteproduct', {product_id: this.selectedid, reason: this.reason}).then((res) => {
					this.$refs['deleteModal'].hide()
					this.reason = ''
					if (res.data.error) {
						this.$swal({
							title: 'Produk gagal dihapus',
							icon: 'error',
						})
					} else {
						this.$swal({
							title: 'Produk berhasil dihapus',
							icon: 'success',
						})
					}
					this.load()
				})
			})
		},
		handleDeleteTotalProduct() {
			this.$swal({
				title: 'Anda yakin ?',
				text: 'Produk ini akan dihapus sepenuhnya',
				type: 'warning',
				showCancelButton: true,
				confirmButtonText: 'Ya',
				cancelButtonText: 'Tidak',
				showCloseButton: true,
				showLoaderOnConfirm: true,
			}).then((result) => {
				if (result.value) {
					this.$axios.delete('admin/deleteproduct', {data: {product_id: this.selectedid, reason: this.reason}}).then((res) => {
						this.$refs['deleteModal'].hide()
						thos.reason = ''
						if (res.data.error) {
							this.$swal({
								title: 'Produk gagal dihapus',
								icon: 'error',
							})
						} else {
							this.$swal({
								title: 'Produk berhasil dihapus total',
								icon: 'success',
							})
						}
						this.load()
					})
				}
			})
		},
		handleRestoreProduct(id, title) {
			this.$swal({
				title: 'Anda yakin ?',
				text: title + ' akan dikembalikan',
				type: 'warning',
				showCancelButton: true,
				confirmButtonText: 'Ya',
				cancelButtonText: 'Tidak',
				showCloseButton: true,
				showLoaderOnConfirm: true,
			}).then((result) => {
				if (result.value) {
					this.$axios
						.put('admin/undelete', {
							product_id: id,
						})
						.then((del) => {
							if (del.data.error) {
								this.$swal({
									title: 'Produk gagal mengembalikan produk',
									icon: 'error',
								})
							} else {
								this.$swal({
									title: 'Produk berhasil dikembalikan',
									icon: 'success',
								})
								this.load()
							}
						})
				}
			})
		},
		handleBannedProduct() {
			this.$validator.validateAll().then((isValid) => {
				if (!isValid) {
					return
				}
				this.$axios.put('admin/banned', {product_id: this.selectedid, reason: this.reason, banned: true}).then((res) => {
					this.$refs['bannedModal'].hide()
					this.reason = ''
					if (res.data.error) {
						this.$swal({
							title: 'Produk gagal dibanned',
							icon: 'error',
						})
					} else {
						this.$swal({
							title: 'Produk berhasil dibanned',
							icon: 'success',
						})
					}
					this.load()
				})
			})
		},
		handleUnbannedProduct(id, title) {
			this.$swal({
				title: 'Anda yakin ?',
				text: title + ' akan di unbanned',
				type: 'warning',
				showCancelButton: true,
				confirmButtonText: 'Ya',
				cancelButtonText: 'Tidak',
				showCloseButton: true,
				showLoaderOnConfirm: true,
			}).then((result) => {
				if (result.value) {
					this.$axios.put('admin/banned', {product_id: id, reason: 'unbanned'}).then((res) => {
						if (res.data.error) {
							this.$swal({
								title: 'Produk gagal di unbanned',
								icon: 'error',
							})
						} else {
							this.$swal({
								title: 'Produk berhasil di unbanned',
								icon: 'success',
							})
						}
						this.load()
					})
				}
			})
		},
		showDeleteModal(id, title) {
			this.reason = ''
			this.selectedid = id
			this.selectedtitle = title
			this.$refs['deleteModal'].show()
		},
		showBannedModal(id, title) {
			this.selectedid = id
			this.selectedtitle = title
			this.$refs['bannedModal'].show()
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
						.put('admin/listproduct', {
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
				.get('admin/listproduct')
				.then((res) => {
					if (!res.data.error) {
						this.items = res.data.data
						this.totalRows = this.items.length
					}
				})
				.catch((err) => {
					this.$q.loading.hide()
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
