<template>
	<div class="row justify-content-center">
		<div class="col-xl-10 col-lg-12 col-md-9">
			<div class="card o-hidden border-0 shadow-lg my-5">
				<div class="card-body p-0">
					<div class="row">
						<div class="col-lg-6 d-none d-lg-block bg-image"></div>
						<div class="col-lg-6">
							<div class="p-5">
								<div class="text-center">
									<h1 class="h4 text-gray-900 mb-4">Registrasi</h1>
								</div>
								<b-alert v-if="message" show dismissible :variant="alerttype">
									{{ message }}
								</b-alert>
								<form class="user" @submit.prevent="handleRegis">
									<div class="form-group">
										<input type="text" class="form-control" v-model="user.username" v-validate="'required'" name="username" aria-describedby="input" placeholder="Masukan username" />
										<small v-if="errors.has('username')" id="usernameHelp" class="form-text text-danger">{{ errors.first('username') }}</small>
									</div>
									<div class="form-group">
										<input type="text" class="form-control" v-model="user.nim" v-validate="'required'" name="nim" aria-describedby="input" placeholder="Masukan nim" />
										<small v-if="errors.has('nim')" id="nimHelp" class="form-text text-danger">{{ errors.first('nim') }}</small>
									</div>
									<div class="form-group">
										<input type="text" class="form-control" v-model="user.email" v-validate="'required|email'" name="email" aria-describedby="input" placeholder="Masukan email" />
										<small v-if="errors.has('email')" id="emailHelp" class="form-text text-danger">{{ errors.first('email') }}</small>
									</div>
									<div class="form-group">
										<input type="password" class="form-control" v-model="user.password" v-validate="'required'" name="password" placeholder="Password" />
										<small v-if="errors.has('password')" id="passwordHelp" class="form-text text-danger">{{ errors.first('password') }}</small>
									</div>
									<button type="submit" class="btn btn-primary btn-block" :disabled="loading">
										<span v-show="loading" class="spinner-border spinner-border-sm"></span>
										<span>Registrasi</span>
									</button>
								</form>
								<hr />
								<router-link to="login" class="btn btn btn-outline-primary btn-block">Masuk</router-link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import User from '../models/user.model'

export default {
	name: 'Register',
	data() {
		return {
			user: new User('', '', '', '', ''),
			loading: false,
			alerttype: 'danger',
			message: '',
			errorField: {},
		}
	},
	computed: {
		loggedIn() {
			return this.$store.state.auth.status.loggedIn
		},
	},
	created() {
		if (this.loggedIn) {
			this.$router.push('/')
		}
	},
	methods: {
		handleRegis() {
			this.message = ''
			this.loading = true
			this.$validator.validateAll().then((isValid) => {
				if (!isValid) {
					this.loading = false
					return
				}

				if (this.user.username && this.user.password) {
					this.$store.dispatch('auth/register', this.user).then(
						(data) => {
							this.loading = false
							this.alerttype = 'success'
							this.message = 'Pendaftaran berhasil'
						},
						(error) => {
							this.loading = false
							this.alerttype = 'danger'
							this.loading = false
							if (error.data.error)
								error.data.error.forEach((field) => {
									this.errors.add({
										field: field.param,
										msg: field.msg,
									})
								})
							this.message = error.data.msg || error.msg
						},
					)
				}
			})
		},
	},
}
</script>
