<template>
	<div class="ibox">
		<router-link :to="'/product/' + username + '/' + title" class="ibox-content product-box">
			<img class="product-thumbnail mx-auto d-block" :src="thumbnail" alt="product_thumbnail" />
			<div class="product-desc">
				<span class="product-type btn-gradient">
					{{ type }}
				</span>
				<span href="#" class="product-name">{{ title }}</span>
				<small class="text-muted">Oleh {{ username }}</small>
			</div>
		</router-link>
	</div>
</template>
<script>
export default {
	name: 'productCard',
	props: {
		title: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			required: true,
		},
		thumbnail: {
			type: String,
			required: true,
		},
	},
}
</script>
