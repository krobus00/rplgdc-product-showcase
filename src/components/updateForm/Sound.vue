<template>
	<q-layout>
		<q-page-container>
			<b-container>
				<h1 class="text-center mb-5 explore">Tambah produk</h1>
				<b-form @submit.prevent="updateProduct" enctype="multipart/form-data">
					<div class="row">
						<div class="col-md-3">
							<div class=" text-center">
								<b-img thumbnail fluid :src="thumnailsrc" alt="Thumbnail produk" @click="browseThumbnail"></b-img>
								<input type="file" hidden accept="image/*" ref="fileInput" name="thumbnail" @change="onFileChange" class="" />
								<h6 class="">Thumbnail produk</h6>
								<small v-if="errors.has('thumbnail')" id="thumbnailHelp" class="form-text text-danger">{{ errors.first('thumbnail') }}</small>
							</div>
						</div>
						<div class="col-md-9 personal-info">
							<div class="form-group">
								<label class="col-lg-3 control-label">Judul produk :</label>
								<div class="col-lg-8">
									<input class="form-control" v-validate="'required|min:5|max:37'" v-model="title" placeholder="Judul produk" name="title" type="text" value="" autofocus />
									<small v-if="errors.has('title')" id="titleHelp" class="form-text text-danger">{{ errors.first('title') }}</small>
								</div>
							</div>
							<div class="form-group">
								<label class="col-lg-3 control-label">Deskripsi produk :</label>
								<div class="col-lg-8">
									<textarea class="form-control" v-validate="'required|min:5'" v-model="desc" placeholder="deksripsi... " name="desc" id="desc" rows="17"></textarea>
									<small v-if="errors.has('desc')" id="descHelp" class="form-text text-danger">{{ errors.first('desc') }}</small>
								</div>
							</div>
						</div>
					</div>
					<label class="btn btn-primary" @click="browseMedia">Tambah media</label>
					<input type="file" name="media" hidden multiple accept="audio/*" ref="mediaFile" @change="onMediaChange" />
					<small v-if="errors.has('media')" id="mediaHelp" class="form-text text-danger">{{ errors.first('media') }}</small>
					<span style="color: red;">*Pilih media untuk ditampilkan</span>
					<hr />
					<div class="row" id="listimg">
						<div v-for="(img, key) in oldmedia" class="col-md-4 p-2">
							<b-card height="200px" img-alt="Produk media" text-variant="white">
								<b-card-text align="right">
									<v-icon name="times" style="color:black" @click="deleteMedia(key, img.id)" scale="1" />
								</b-card-text>
								<p class="text-black">{{ img.title }}</p>
							</b-card>
						</div>
						<div v-for="(img, key) in mediasrc" class="col-md-4 p-2">
							<b-card height="200px" img-alt="Produk media" text-variant="white">
								<b-card-text align="right">
									<v-icon name="times" style="color:black" @click="removeMedia(key)" scale="1" />
								</b-card-text>
								<p class="text-black">{{ img }}</p>
							</b-card>
						</div>
					</div>
					<b-button type="submit" variant="primary">Submit</b-button>
				</b-form>
			</b-container>
		</q-page-container>
	</q-layout>
</template>
<script>
export default {
	name: 'SoundUpdate',
	props: {
		detail: {
			required: true,
		},
		productMedia: {
			required: true,
		},
	},
	data() {
		return {
			thumnailsrc: '', //thumbnail file url
			thumbnail: null, //thumbnail file data
			mediasrc: [], //media file url
			media: [], //media file data
			loading: false,
			title: '',
			desc: '',
			oldmedia: [],
		}
	},
	mounted() {
		this.load()
	},
	computed: {
		env() {
			return process.env.data
		},
	},
	methods: {
		updateProduct() {
			let formData = new FormData()
			this.loading = true
			this.$validator.validateAll().then((isValid) => {
				if (!isValid) {
					this.loading = false
					return
				}
				// formData.append('type', this.typeinfo.type_title)
				formData.append('product_id', this.detail.product_id)
				formData.append('thumbnail', this.thumbnail)
				formData.append('title', this.title)
				formData.append('desc', this.desc)
				this.media.forEach((file) => {
					formData.append('media', file)
				})
				this.$axios
					.put('product/update', formData, {
						headers: {
							'Content-Type': 'multipart/form-data',
						},
					})
					.then((res) => {
						if (res.data.error) {
							this.$swal({
								title: 'Gagal update produk',
								icon: 'error',
							}).res.data.data.error.forEach((field) => {
								this.errors.add({
									field: field.param,
									msg: field.msg,
								})
							})
						} else {
							this.$swal({
								title: 'Berhasil update produk',
								icon: 'success',
							}).then(this.$router.push('/myproduct'))
						}
					})
					.catch((err) => {
						console.log(err)
					})
			})
		},
		load() {
			this.thumnailsrc = this.env.BASE_URL + 'public/media/' + this.detail.product_thumbnail
			this.title = this.detail.product_title
			this.desc = this.detail.product_desc
			this.productMedia.forEach((img) => {
				this.oldmedia.push({
					id: img.media_id,
					title: img.media_title,
				})
			})
		},
		removeMedia(key) {
			this.media.splice(key, 1)
			this.mediasrc.splice(key, 1)
		},
		deleteMedia(key, id) {
			this.$swal({
				title: 'Anda yakin ?',
				text: 'Assets ini akan dihapus',
				showCancelButton: true,
				confirmButtonText: 'Ya',
				cancelButtonText: 'Tidak',
				showCloseButton: true,
			}).then((result) => {
				if (result.value) {
					this.$axios
						.delete('product/media', {data: {media_id: id}})
						.then((res) => {
							if (!res.data.error) {
								this.productMedia.splice(key, 1)
								this.oldmedia.splice(key, 1)
								this.$swal('Deleted', 'asset berhasil dihapus', 'success')
								this.load()
							} else {
								console.log(res.data)
								this.$swal('GAGAL', 'asset gagal dihapus', 'error')
							}
						})
						.catch((err) => {
							this.$swal('GAGAL', 'asset gagal dihapus', 'error')
						})
				}
			})
		},
		createThumbnail(file) {
			var image = new Image()
			var reader = new FileReader()
			var vm = this
			reader.onload = function(e) {
				vm.thumnailsrc = e.target.result
			}
			reader.readAsDataURL(file)
		},
		createMedia(file) {
			for (var i = 0; i < file.length; i++) {
				this.mediasrc.push(file[i].name)
			}
		},
		browseThumbnail() {
			this.$refs.fileInput.click()
		},
		browseMedia() {
			this.$refs.mediaFile.click()
		},
		onMediaChange(e) {
			var files = e.target.files || e.dataTransfer.files

			this.media = []
			Array.prototype.push.apply(this.media, files)
			if (!this.media.length) return

			this.createMedia(this.media)
		},
		onFileChange(e) {
			var files = e.target.files || e.dataTransfer.files
			if (!files.length) return
			this.thumbnail = files[0]
			this.createThumbnail(files[0])
		},
	},
}
</script>
