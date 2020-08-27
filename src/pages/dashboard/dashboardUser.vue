<template>
	<q-layout>
		<q-page-container>
			<dashboardNavbar></dashboardNavbar>
			<h1 class="text-center m-3">MANAJEMEN USER</h1>
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
						<b-button v-if="row.item.status == 'admin'" variant="success" @click="handleChangeStatus(row.item.user_id, row.item.name, row.item.status)" size="sm" class="mr-1 mb-1">
							<v-icon name="user-secret" scale="1" />
						</b-button>

						<b-button v-if="row.item.status == 'member'" variant="info" @click="handleChangeStatus(row.item.user_id, row.item.name, row.item.status)" size="sm" class="mr-1 mb-1">
							<v-icon name="user" scale="1" />
						</b-button>
						<!-- banned -->
						<b-button variant="danger" @click="handleDeleteUser(row.item.user_id, row.item.name)" size="sm" class="mr-1 mb-1">
							<v-icon name="user-times" scale="1" />
						</b-button>
					</template>
				</b-table>
				<b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="mb-5" align="left" />
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
	name: 'DashboardUser',
	data() {
		return {
			field: [
				{
					key: 'name',
					label: 'Nama',
					sortable: true,
				},
				{
					key: 'nim',
					label: 'NIM',
					sortable: true,
				},
				{
					key: 'email',
					label: 'Email',
					sortable: true,
				},
				{
					key: 'status',
					label: 'Status',
					sortable: true,
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
		handleChangeStatus(id, name, status) {
			this.$swal({
				title: 'Anda yakin ?',
				text: name + ' akan menjadi ' + (status == 'admin' ? 'member' : 'admin'),
				showCancelButton: true,
				confirmButtonText: 'Ya',
				cancelButtonText: 'Tidak',
				showCloseButton: true,
			}).then((result) => {
				if (result.value) {
					this.$axios
						.put('admin/changestatus', {
							user_id: id,
							status: status == 'admin' ? 'member' : 'admin',
						})
						.then((res) => {
							console.log(res)
							if (res.data.error) {
								this.$swal({
									title: 'Gagal mengubah status',
									icon: 'error',
								})
							} else {
								this.$swal({
									title: 'Status berhasil diubah',
									icon: 'success',
								})
							}
							this.load()
						})
				}
			})
		},
		handleDeleteUser(id, name) {
			this.$swal({
				title: 'Anda yakin ?',
				text: name + ' akan dihapus. Semua produk ' + name + ' juga akan terhapus',
				showCancelButton: true,
				confirmButtonText: 'Ya',
				cancelButtonText: 'Tidak',
				showCloseButton: true,
			}).then((result) => {
				if (result.value) {
					this.$axios.delete('admin/deleteuser/?id=' + id).then((res) => {
						console.log(res)
						if (res.data.error) {
							this.$swal({
								title: 'User gagal dihapus',
								icon: 'error',
							})
						} else {
							this.$swal({
								title: 'User berhasil dihapus',
								icon: 'success',
							})
						}
						this.load()
					})
				}
			})
		},

		load() {
			this.$axios
				.get('admin/listuser')
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
