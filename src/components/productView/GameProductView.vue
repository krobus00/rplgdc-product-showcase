<template>
	<div class="row">
		<div class="col-12">
			<span class="product-view-type btn-gradient">
				{{ detail.type_title }}
			</span>
			<h1>{{ detail.product_title }}</h1>
			<span>Dibuat oleh {{ detail.username }}</span>
		</div>
		<div class="col-12">
			<div class="embed-responsive embed-responsive-4by3">
				<object v-if="isFlash(detail.product_location)" type="application/x-shockwave-flash" :data="env.BASE_URL + detail.product_location" id="flashFullscreen" class="embed-responsive-item">
					<param name="movie" :value="env.BASE_URL + detail.product_location" />
					<param name="allowFullScreen" value="true" />
				</object>
				<iframe v-else class="embed-responsive-item" :src="env.BASE_URL + detail.product_location"></iframe>
			</div>
		</div>
		<div class="col-12">
			<p>{{ detail.product_desc }}</p>
		</div>
	</div>
</template>

<script>
export default {
	name: 'GameProductView',
	props: ['detail', 'media'],
	computed: {
		env() {
			return process.env.data
		},
	},
	methods: {
		isFlash(url) {
			const check = /(?:\.([^.]+))?$/
			const ext = check.exec(url)[0].toLowerCase()
			return ext == '.swf'
		},
	},
}
</script>
