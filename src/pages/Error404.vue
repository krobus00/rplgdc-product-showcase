<template>
	<div class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center">
		<div>
			<div style="font-size: 30vh">
				404
			</div>

			<div class="text-h2" style="opacity:.4">
				Oops. Nothing here...
			</div>
			<router-link to="/"><b-button variant="primary" class="mt-5">Kembali</b-button></router-link>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Error404',
}
</script>
