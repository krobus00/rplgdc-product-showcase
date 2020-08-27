<template>
	<div>
		<div class="row">
			<div class="col-9">
				<span class="product-view-type btn-gradient">
					{{ detail.type_title }}
				</span>
				<h1>{{ detail.product_title }}</h1>
				<span>Dibuat oleh {{ detail.username }}</span>
			</div>
			<div class="col-3">
				<a v-if="detail.download == 1" :href="env.BASE_URL + 'api/product/' + detail.username + '/' + detail.product_title + '/download'" class="btn btn-primary btn-gradient product-action" role="button" aria-pressed="true">UNDUH</a>
				<a v-if="detail.download == 0" :href="detail.product_location" target="_blank" class="btn btn-primary btn-gradient product-action" role="button" aria-pressed="true">KUNJUNGI</a>
			</div>
		</div>
		<div v-if="media.length" class="row">
			<div class="col-12 col-lg-6 col-sm-12">
				<b-carousel id="carousel-1" v-model="slide" :interval="4000" controls indicators background="#ababab" img-width="1024" img-height="480" style="text-shadow: 1px 1px 2px #333;" @sliding-start="onSlideStart" @sliding-end="onSlideEnd">
					<b-carousel-slide v-for="item in media" :key="item.media_id">
						<template v-slot:img>
							<img class="d-block w-100 product-media" :src="env.BASE_URL + env.MEDIA_URL + item.url" alt="image slot" />
						</template>
					</b-carousel-slide>
				</b-carousel>
			</div>
			<div class="col-12 col-lg-6 col-sm-12">
				<h2>Deskripsi produk</h2>
				<p>{{ detail.product_desc }}</p>
			</div>
		</div>
		<div v-else class="row">
			<div class="col-12">
				<h2>Deskripsi produk</h2>
				<p>{{ detail.product_desc }}</p>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'NormalProductView',
	data() {
		return {
			slide: 0,
			sliding: null,
		}
	},
	computed: {
		env() {
			return process.env.data
		},
	},
	methods: {
		onSlideStart(slide) {
			this.sliding = true
		},
		onSlideEnd(slide) {
			this.sliding = false
		},
	},
	props: ['detail', 'media'],
}
</script>
