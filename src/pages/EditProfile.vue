<template>
	<q-layout>
		<q-page-container>
			<normalNavbar></normalNavbar>
			<div class="row row justify-content-center mt-5">
				<div class="col-md-6">
					<form @submit.prevent="handleEditProfile" class="form-horizontal">
						<fieldset class="fieldset">
							<h3 class="fieldset-title text-center">Personal Info</h3>
							<hr />
							<div class="form-group">
								<label class="">NIM</label>
								<div class="">
									<input type="text" readonly class="form-control" :value="userDetail.nim" />
								</div>
							</div>
							<div class="form-group">
								<label class="">username</label>
								<div class="">
									<input type="text" readonly class="form-control" :value="userDetail.username" />
								</div>
							</div>
							<div class="form-group">
								<label class="">Email</label>
								<div class="">
									<input v-model="email" v-validate="'required|email'" name="email" class="form-control" />
									<small v-if="errors.has('email')" id="emailHelp" class="form-text text-danger">{{ errors.first('email') }}</small>
								</div>
							</div>
						</fieldset>
						<fieldset class="fieldset">
							<h3 class="fieldset-title text-center">Password</h3>
							<hr />
							<div class="form-group">
								<label class="">Password lama</label>
								<div class="">
									<input v-model="oldpassword" type="password" name="oldpassword" class="form-control" value="" />
									<small v-if="errors.has('oldpassword')" id="oldpasswordHelp" class="form-text text-danger">{{ errors.first('oldpassword') }}</small>
								</div>
							</div>
							<div class="form-group">
								<label class="">Password baru</label>
								<div class="">
									<input v-model="password" type="password" name="password" class="form-control" value="" />
								</div>
							</div>
							<div class="form-group">
								<label class="">Konfirmasi password baru</label>
								<div class="">
									<input v-model="cpassword" type="password" name="cpassword" v-validate="'confirmed:password'" class="form-control" value="" />
									<small v-if="errors.has('cpassword')" id="cpasswordHelp" class="form-text text-danger">{{ errors.first('cpassword') }}</small>
								</div>
							</div>
						</fieldset>
						<hr />
						<div class="form-group">
							<div class="col-md-10 col-sm-9 col-xs-12 col-md-push-2 col-sm-push-3 col-xs-push-0">
								<input class="btn btn-primary" id="submit" type="submit" value="Update Profile" />
							</div>
						</div>
					</form>
				</div>
			</div>
		</q-page-container>
	</q-layout>
</template>

<script>
import normalNavbar from 'components/normalNavbar.vue'
export default {
	components: {
		normalNavbar,
	},
	name: 'EditProfile',
	data() {
		return {
			userDetail: {},
			email: '',
			oldpassword: '',
			password: '',
			cpassword: '',
		}
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
		handleEditProfile() {
			this.$validator.validateAll().then((isValid) => {
				if (!isValid) {
					return
				}
				this.$axios
					.put('user/editprofile', {
						email: this.email,
						oldpassword: this.oldpassword,
						password: this.password,
						cpassword: this.cpassword,
					})
					.then((res) => {
						if (res.data.error) {
							res.data.data.error.forEach((field) => {
								this.errors.add({
									field: field.param,
									msg: field.msg,
								})
							})
							this.$swal({
								title: 'Update profile gagal',
								icon: 'error',
							})
						} else {
							this.$swal({
								title: 'Profile berhasil diupdate',
								icon: 'success',
							})
							this.load()
						}
					})
			})
		},
		load() {
			this.$axios
				.get('user/userinfo')
				.then((res) => {
					if (!res.data.error) {
						this.userDetail = res.data.data
						this.email = this.userDetail.email
					}
				})
				.catch((err) => {
					console.log(err)
				})
		},
	},
}
</script>
