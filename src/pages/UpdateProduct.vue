<template>
	<q-layout>
		<q-page-container>
			<normalNavbar></normalNavbar>
			<b-container>
				<h1 class="text-center">
					{{ msg }}
				</h1>
				<div v-show="!msg">
					<!-- {{ detailProduct }} -->
					<b-container class="mt-5" v-if="detailProduct.type_title == 'game' || detailProduct.type_title == 'web' || detailProduct.type_title == 'mobile' || detailProduct.type_title == 'bot'">
						<Normal :detail="detailProduct" :productMedia="mediaProduct"></Normal>
					</b-container>
					<b-container class="mt-5" v-else-if="detailProduct.type_title == 'design'">
						<Design :detail="detailProduct" :productMedia="mediaProduct"></Design>
					</b-container>
					<b-container class="mt-5" v-else-if="detailProduct.type_title == 'sound'">
						<Sound :detail="detailProduct" :productMedia="mediaProduct"></Sound>
					</b-container>
				</div>
			</b-container>
		</q-page-container>
	</q-layout>
</template>
<script>
import normalNavbar from 'components/normalNavbar.vue'
import Normal from 'components/updateForm/Normal.vue'
import Design from 'components/updateForm/Design.vue'
import Sound from 'components/updateForm/Sound.vue'
export default {
	components: {
		normalNavbar,
		Normal,
		Design,
		Sound,
	},
	name: 'UpdateProduct',
	data() {
		return {
			username: this.$route.params.username,
			title: this.$route.params.title,
			msg: '',
			detailProduct: {},
			mediaProduct: [],
		}
	},
	mounted() {
		this.load()
	},
	computed: {
		currentUser() {
			return this.$store.state.auth.info
		},
	},
	watch: {
		'$route.params.title': function(id) {
			this.title = this.$route.params.title
			this.username = this.$route.params.username
			this.$q.loading.show()
			this.load()
		},
		'$route.params.title': function(id) {
			this.title = this.$route.params.title
			this.username = this.$route.params.username
			this.$q.loading.show()
			this.load()
		},
	},
	methods: {
		load() {
			this.$axios
				.get('product/' + this.username + '/' + this.title)
				.then((res) => {
					if (!res.data.error) {
						this.msg = res.data.msg
						if (this.currentUser.userData.user_id == res.data.data.detail[0].user_id) {
							this.detailProduct = res.data.data.detail[0]
							if (res.data.data.media) this.mediaProduct = res.data.data.media
						} else {
							this.msg = 'Anda tidak diizinkan untuk mengubah produk ini'
						}
						this.$q.loading.hide()
					}
				})
				.catch((err) => {
					this.$q.loading.hide()
					this.msg = 'Terjadi kesalahan'
					console.log(err)
				})
		},
	},
}
</script>
