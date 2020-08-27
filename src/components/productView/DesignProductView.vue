<template>
	<div>
		<b-container>
			<div class="row">
				<div class="col-12">
					<span class="product-view-type btn-gradient">
						{{ detail.type_title }}
					</span>
					<h1>{{ detail.product_title }}</h1>
					<span>Dibuat oleh {{ detail.username }}</span>
				</div>
				<div class="col-12 col-lg-6 col-sm-12">
					<h3>Deskripsi produk</h3>
					<p>{{ detail.product_desc }}</p>
				</div>
			</div>
			<div v-masonry item-selector=".item" class="masonry-container">
				<div v-masonry-tile class="item" :key="index" v-for="(item, index) in media">
					<img v-if="isImage(item.url)" v-img class="ibox p-2" width="200px" height="200px" :src="'http://192.168.10.253:3000/public/media/' + item.url" />
					<video v-else class="ibox p-2" width="300px" height="200px" controls>
						<source :src="env.BASE_URL + env.MEDIA_URL + item.url" />
					</video>
				</div>
			</div>
		</b-container>
	</div>
</template>
<script>
import {VueMasonryPlugin} from 'vue-masonry'
export default {
	name: 'DesignProductView',
	props: ['detail', 'media'],
	computed: {
		env() {
			return process.env.data
		},
	},
	methods: {
		isImage(url) {
			const check = /(?:\.([^.]+))?$/
			const ext = check.exec(url)[1].toLowerCase()
			return ext.includes('jp') || ext.includes('pn') || ext.includes('gi') || ext.includes('jf')
		},
	},
}
</script>
