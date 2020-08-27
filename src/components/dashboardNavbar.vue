<template>
	<q-header reveal elevated>
		<b-navbar toggleable="lg" type="light" class="bg-white">
			<b-container>
				<b-navbar-brand to="/">
					<img src="~/assets/rplgdclogo.jpeg" width="30" height="30" class="d-inline-block align-top" alt="RPLGDC" />
					RPL-GDC
				</b-navbar-brand>
				<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
				<b-form @submit.prevent="handleSearch" inline class=" my-2 navbar-form ">
					<b-input-group class="input-group input-group-search mx-auto">
						<template v-slot:prepend>
							<b-dropdown class="btn-type" :text="selected" variant="primary">
								<b-dropdown-item value="all" @click="selected = 'all'">
									all
								</b-dropdown-item>
								<b-dropdown-item v-for="option in type" :key="option.type_title" :value="option.type_title" @click="selected = option.type_title">
									{{ option.type_title }}
								</b-dropdown-item>
							</b-dropdown>
						</template>
						<b-form-input v-model="search"></b-form-input>
						<template v-slot:append>
							<b-button type="submit" variant="primary" :disabled="loading">
								<span v-show="loading" class="spinner-border spinner-border-sm"></span>
								<v-icon v-show="!loading" name="search" scale="1" />
							</b-button>
							<!-- <b-button variant="primary"></b-button> -->
						</template>
					</b-input-group>
				</b-form>

				<b-collapse id="nav-collapse" is-nav>
					<b-navbar-nav class="ml-auto">
						<b-nav-item-dropdown v-if="!currentUser.token" right>
							<template v-slot:button-content>
								<em>GUEST</em>
							</template>
							<b-dropdown-item to="/login">Masuk</b-dropdown-item>
							<b-dropdown-item to="/regis">Daftar</b-dropdown-item>
						</b-nav-item-dropdown>
						<b-nav-item-dropdown v-if="currentUser.token" right>
							<template v-slot:button-content>
								<strong>{{ currentUser.userData.username }}</strong>
							</template>
							<b-dropdown-item to="/editprofile">Edit profile</b-dropdown-item>
							<b-dropdown-item v-if="currentUser.userData.admin" to="/admin/dashboard">dashboard</b-dropdown-item>
							<b-dropdown-item to="/myproduct">Produk saya</b-dropdown-item>
							<b-dropdown-item @click.prevent="logOut">Logout</b-dropdown-item>
						</b-nav-item-dropdown>
					</b-navbar-nav>
				</b-collapse>
			</b-container>
		</b-navbar>
		<div class="scrollmenu">
			<div class="container mx-auto text-center">
				<router-link to="/admin/dashboard">home</router-link>
				<router-link to="/admin/product">produk</router-link>
				<router-link to="/admin/user">user</router-link>
			</div>
		</div>
	</q-header>
</template>
<script>
import UserService from '../services/user.service'

export default {
	name: 'dashboardNavbar',
	data() {
		return {
			selected: 'all',
			search: '',
			loading: false,
			type: [],
		}
	},
	computed: {
		currentUser() {
			return this.$store.state.auth.info
		},
	},
	mounted() {
		// this.load()
	},
	methods: {
		handleSearch() {
			if (this.search != '') {
				this.loading = true
				this.$router.push({
					path: `/search/${this.selected}/${this.search}`,
				})
				this.loading = false
			}
		},
		logOut() {
			this.$store.dispatch('auth/logout')
			this.$router.push('/')
		},
	},
}
</script>
