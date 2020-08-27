<template>
	<div id="q-app">
		<router-view />
	</div>
</template>
<script>
export default {
	name: 'App',
}
</script>
<style>
/* custom scrollbar */
/* total width */
::-webkit-scrollbar {
	background-color: #fff;
	width: 16px;
}

::-webkit-scrollbar-track {
	background-color: #fff;
}

::-webkit-scrollbar-thumb {
	background-color: #babac0;
	border-radius: 16px;
	border: 4px solid #fff;
}

::-webkit-scrollbar-button {
	display: none;
}
.navbar-brand {
	font-weight: bold;
}
.profile {
	color: black !important;
	font-weight: 500;
	text-transform: uppercase;
}
.admin {
	color: white !important;
	font-weight: 500;
	text-transform: uppercase;
}
.card-box {
	padding: 20px;
	border-radius: 3px;
	margin-bottom: 30px;
	background-color: #fff;
	box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}
.nav-link {
	display: inline-block;
	color: white;
	text-align: center;
	padding: 14px;
	text-decoration: none;
	font-weight: 500;
	text-transform: uppercase;
}
input,
textarea {
	outline: none;
	box-shadow: none !important;
	border: 1px solid #ccc !important;
}
canvas {
	display: block;
}
#particles-js {
	position: absolute;
	width: 100%;
	height: 100%;
	background-color: #000000;
	background-repeat: no-repeat;
	background-size: cover;
	background-position: 50% 50%;
}
.bg-primary,
.btn-primary,
.btn-primary:hover,
.btn-primary:active,
.btn-primary:visited {
	background-color: #e67f22 !important;
	border-color: #e67f22 !important;
}
.btn-outline-primary {
	color: #e67f22 !important;
	border-color: #e67f22 !important;
}
.btn-outline-primary:hover {
	color: #ffffff !important;
	background-color: #e67f22 !important;
}
.btn-gradient {
	background: #e67f22; /* fallback for old browsers */
	background: -webkit-linear-gradient(to right, #ee9423, #f16450); /* Chrome 10-25, Safari 5.1-6 */
	background: linear-gradient(to right, #ee9423, #f16450); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
	color: #fff;
	border: 0px;
}
.btn:focus,
.btn:active {
	outline: none !important;
	box-shadow: none !important;
}
.panel {
	font-size: 1.3em;
	position: absolute;
	z-index: 10;
	width: 400px;
	height: 250px;
	background: #eee;
	top: 50%;
	left: 50%;
	margin: -125px 0 0 -200px;
	padding: 20px;
	border-radius: 4px;
	box-sizing: border-box;
	z-index: 100;
}
.text0 {
	font-family: 'Roboto', sans-serif;
	font-size: 70px;
	font-weight: 700;
	color: #e67f22;
}
.text4 {
	font-family: 'Roboto', sans-serif;
	font-size: 70px;
	font-weight: 700;
}
.navbar-form {
	-webkit-flex-basis: 100%;
	-moz-flex-basis: 100%;
	-ms-flex-basis: 100%;
	-o-flex-basis: 100%;
	flex-basis: -moz-available;
	flex-basis: 100%;
}
.input-group-search {
	width: 100% !important;
}
@media (min-width: 480px) {
	.navbar-expand-sm .input-group-search {
		width: 100% !important;
	}
}
@media (min-width: 768px) {
	.navbar-expand-md .input-group-search {
		width: 90% !important;
	}
}
@media (min-width: 992px) {
	.navbar-expand-lg .input-group-search {
		width: 80% !important;
	}
}
@media (min-width: 1200px) {
	.navbar-expand-xl .input-group-search {
		width: 70% !important;
	}
}
.search-box .btn-light {
	border: 1px solid #ced4da;
}
.scrollmenu {
	background-color: #e67f22;
	overflow: auto;
	white-space: nowrap;
}
.scrollmenu a:hover {
	color: black;
}
.btn-type button {
	text-transform: uppercase;
}
.scrollmenu .router-link-exact-active {
	background-color: #e5e5e5;
	display: inline-block;
	color: #3e3e40 !important;
	text-align: center;
	padding: 14px;
	text-decoration: none;
	font-weight: 500;
	text-transform: uppercase;
}
/* a.active {
	background-color: #e5e5e5;
	display: inline-block;
	color: #3e3e40 !important;
	text-align: center;
	padding: 14px;
	text-decoration: none;
	font-weight: 500;
	text-transform: uppercase;
} */

a {
	text-decoration: none !important;
}
.dropdown-item {
	text-transform: uppercase;
}
.carousel-item {
	text-transform: uppercase;
}
.carousel-item p {
	font-size: 90px;
	font-weight: 300;
}
.scrollmenu a {
	display: inline-block;
	color: white;
	text-align: center;
	padding: 14px;
	text-decoration: none;
	font-weight: 500;
	text-transform: uppercase;
}
.scrollmenu a {
	transition: 0.3s;
}
.scrollmenu a:hover {
	background-color: #e58d3e;
}

.carousel-control-next i,
.carousel-control-prev i {
	color: gray !important;
}
.product-showcase {
	margin: 50px 0 50px 0;
	/* padding-top: 100px; */
	/* padding-bottom: 100px; */
}
.product {
	/* width: 200px; */
	position: relative;
}
.explore {
	text-transform: uppercase;
}
.product-thumbnail {
	border-radius: 32px;
	width: 100%;
	max-width: 200px;
	height: 200px;
	opacity: 1;
	transition: 0.5s ease;
	backface-visibility: hidden;
}
.product-view {
	transition: 0.7s ease;
	opacity: 0;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	-ms-transform: translate(-50%, -50%);
	text-align: center;
}
.product:hover .product-thumbnail {
	opacity: 0.3;
}

.product:hover .product-view {
	opacity: 1;
}
.product-title {
	font-size: 16px;
	color: #e67f22;
	font-size: 18px;
	font-weight: 700;
	text-transform: uppercase;
}
.footbar {
	position: relative;
	bottom: 0;
	width: 100%;
	height: 10px;
	background-color: #e67f22;
}
/* .product-content {
	margin-top: 20px;
} */
.product-media {
	object-fit: cover;
	width: 100%;
	height: 300px;
	/* background-color: #e67f22; */
}
.carousel-thumbnails .carousel-indicators img {
	max-width: 100px;
	height: 50px;
	overflow: hidden;
	display: block;
}

.carousel-thumbnails .carousel-indicators li {
	height: auto;
	max-width: 100px;
	width: 80px;
	border: none;
}

.carousel-thumbnails .carousel-indicators .active {
	border-bottom: 4px solid #e67f22;
}
.product-box {
	padding: 0;
	border: 1px solid #e7eaec;
}

.product-desc {
	padding: 20px;
	position: relative;
}
.product-name {
	font-size: 1.25rem;
	font-weight: 500;
	letter-spacing: 0.0125em;
	line-height: 2rem;
	color: #384649;
	display: block;
	margin: 0px 0 -5px 0;
	max-width: 200px;
	word-wrap: break-word;
	text-decoration: none;
}
a:hover {
	text-decoration: none;
}
.product-action {
	margin-bottom: -20px;
}
.product-type {
	font-size: 14px;
	font-weight: 600;
	color: #ffffff;
	padding: 6px 12px;
	position: absolute;
	top: -32px;
	left: 0;
	border-radius: 4px;
	text-transform: uppercase;
}
.product-view-type {
	font-size: 14px;
	font-weight: 600;
	color: #ffffff;
	padding: 6px 12px;
	border-radius: 4px;
	text-transform: uppercase;
}
.product-detail .ibox-content {
	padding: 30px 30px 50px 30px;
}

/* .product-images {
	margin: 0 20px;
} */

.ibox {
	text-decoration: none;
	clear: both;
	margin-bottom: 25px;
	margin-top: 0;
	padding: 0;
	box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

.ibox-title {
	-moz-border-bottom-colors: none;
	-moz-border-left-colors: none;
	-moz-border-right-colors: none;
	-moz-border-top-colors: none;
	background-color: #ffffff;
	border-color: #e7eaec;
	border-image: none;
	border-style: solid solid none;
	border-width: 3px 0 0;
	color: inherit;
	margin-bottom: 0;
	padding: 14px 15px 7px;
	min-height: 48px;
}
a.ibox-content,
a.ibox-content:hover {
	color: inherit;
	display: block;
	text-decoration: none;
}
.ibox:hover {
	transition: 0.1s ease-in;
	transform: scale(1.05);
}
.ibox-content {
	background-color: #ffffff;
	color: inherit;
	padding: 15px 20px 20px 20px;
	border-color: #e7eaec;
	border-image: none;
	border-style: solid solid none;
	border-width: 1px 0;
}
.ibox-footer {
	color: inherit;
	border-top: 1px solid #e7eaec;
	font-size: 90%;
	background: #ffffff;
	padding: 10px 15px;
}
a:hover {
	cursor: pointer;
}
#pagination {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
}
#pagination ul {
	list-style: none;
	padding: 0;
	margin: 0;
	display: flex;
}
#pagination ul li {
	color: #fff;
	display: flex;
}
#pagination ul li a {
	background-color: #384649;
	color: #fff;
	padding: 5px 10px;
	border-right: 0;
}
#pagination li.active a {
	background-color: #e67f22;
}
#pagination li:first-child a {
	border-radius: 5px 0 0 5px;
}
#pagination li:last-child a {
	border-radius: 0 5px 5px 0;
	/* border-right: 2px solid $border-color; */
}

.bg-image {
	background: url('./assets/rplgdclogo.jpeg');
	background-position: center;
	background-size: cover;
}

/* .custom-select {
	outline: none !important;
} */
a i {
	color: white !important;
}
.page-item.active .page-link {
	color: #fff;
	background-color: #e67f22;
	border-color: #e67f22;
}
.picture-container {
	position: relative;
	cursor: pointer;
	text-align: center;
}
.picture {
	/* width: 190px; */
	height: 190px;
	background-color: #999999;
	border: 4px solid #cccccc;
	color: #ffffff;
	border-radius: 4px;
	margin: 0px auto;
	overflow: hidden;
	transition: all 0.2s;
	-webkit-transition: all 0.2s;
}
.picture:hover {
	border-color: #e67f22;
}
.picture input[type='file'] {
	cursor: pointer;
	display: block;
	height: 100%;
	left: 0;
	opacity: 0 !important;
	position: absolute;
	top: 0;
	width: 100%;
}

.picture-src {
	width: 100%;
}
.imagePreview {
	width: 100%;
	height: 180px;
	background-position: center center;
	background-color: #fff;
	background-size: cover;
	background-repeat: no-repeat;
	display: inline-block;
}
.imgUp {
	margin-bottom: 15px;
	box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}
.delmedia,
.del {
	position: absolute;
	top: 15px;
	right: 15px;
	width: 30px;
	height: 25px;
	text-align: center;
	/* background-color: rgba(255, 255, 255, 0.6); */
	cursor: pointer;
}
option {
	border: none;
	outline: none;
}
.thumbnail-box {
	width: 200px;
	height: 200px;
}

@media only screen and (max-width: 320px) {
	.masonry {
		-moz-column-count: 1;
		-webkit-column-count: 1;
		column-count: 1;
	}
}

@media only screen and (min-width: 321px) and (max-width: 768px) {
	.masonry {
		-moz-column-count: 2;
		-webkit-column-count: 2;
		column-count: 2;
	}
}
@media only screen and (min-width: 769px) and (max-width: 1200px) {
	.masonry {
		-moz-column-count: 3;
		-webkit-column-count: 3;
		column-count: 3;
	}
}
@media only screen and (min-width: 1201px) {
	.masonry {
		-moz-column-count: 3;
		-webkit-column-count: 3;
		column-count: 3;
	}
}
.player-thumbnail {
	object-fit: fill;
	height: auto;
	width: 100%;
}
#mediaTitle {
	font-weight: bold;
}
#pButton {
	float: left;
}

#timeline {
	width: 95%;
	height: 4px;
	margin-top: 18px;
	margin-left: 10px;
	float: left;
	-webkit-border-radius: 15px;
	border-radius: 15px;
	background: #e67f22; /* fallback for old browsers */
	background: -webkit-linear-gradient(to right, #ee9423, #f16450); /* Chrome 10-25, Safari 5.1-6 */
	background: linear-gradient(to right, #ee9423, #f16450);
}

#pButton {
	margin-top: 12px;
	cursor: pointer;
}

#playhead {
	width: 14px;
	height: 14px;
	-webkit-border-radius: 50%;
	border-radius: 50%;
	margin-top: -5px;
	background: black;
	cursor: pointer;
}
#playlist {
	height: 350px;
	overflow: scroll;
	padding-inline-start: 0 !important;
}
#playlist li {
	transition: 0.5s;
	cursor: pointer;
	display: block;
	margin: 0;
	padding: 21px;
	font-weight: 500;
}
#playlist li.active {
	background: #e67f22; /* fallback for old browsers */
	background: -webkit-linear-gradient(to right, #ee9423, #f16450); /* Chrome 10-25, Safari 5.1-6 */
	background: linear-gradient(to right, #ee9423, #f16450); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
	color: #fff;
	border: 0px;
}
#playlist li:hover {
	background-color: rgba(0, 0, 0, 0.1);
}
</style>
