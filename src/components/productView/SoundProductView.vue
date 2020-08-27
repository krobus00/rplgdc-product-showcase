<template>
	<div class="row">
		<div class="container mb-3">
			<span class="product-view-type btn-gradient">
				{{ detail.type_title }}
			</span>
			<h1>{{ detail.product_title }}</h1>
			<span>Dibuat oleh {{ detail.username }}</span>
		</div>
		<div class="col-md-3">
			<img class="player-thumbnail card-box" :src="env.BASE_URL + env.MEDIA_URL + detail.product_thumbnail" />
		</div>
		<div class="col-md-9">
			<audio id="music" preload="true">
				<source id="musicsource" :src="env.BASE_URL + env.MEDIA_URL + media[selected].url" />
			</audio>
			<span>Memainkan :</span>
			<span id="mediaTitle">{{ media[selected].media_title }}</span>
			<div id="audioplayer">
				<v-icon v-if="!playing" id="pButton" @click.prevent="PlayPause" name="play" scale="1" />
				<v-icon v-else id="pButton" @click.prevent="PlayPause" name="pause" scale="1" />
				<div @click="seek" id="timeline">
					<div :style="'margin-left:' + percentComplete + 'px'" id="playhead"></div>
				</div>
			</div>
			<h5 class="mt-5 mb-3">PLAYLIST</h5>
			<ul id="playlist">
				<li :key="index" v-for="(item, index) in media" @click="changeMedia(index)" :class="index == selected ? 'active' : ''">{{ item.media_title }}</li>
			</ul>
		</div>
	</div>
</template>
<script>
export default {
	name: 'SoundProductView',
	props: ['detail', 'media'],
	data() {
		return {
			audio: undefined,
			currentSeconds: 0,
			durationSeconds: 0,
			loaded: false,
			playing: false,
			timeline: 0,
			selected: 0,
		}
	},
	computed: {
		env() {
			return process.env.data
		},
		percentComplete() {
			if (!this.playing) return 0
			return parseInt((this.currentSeconds / this.durationSeconds) * this.timeline)
		},
	},
	mounted() {
		this.selected = 0
		this.audio = this.$el.querySelectorAll('audio')[0]
		this.audio.load()
		this.timeline = this.$el.querySelectorAll('#timeline')[0].offsetWidth - this.$el.querySelectorAll('#playhead')[0].offsetWidth
		this.audio.addEventListener('timeupdate', this.update)
		this.audio.addEventListener('loadeddata', this.load)
		this.audio.addEventListener('pause', () => {
			this.playing = false
		})
		this.audio.addEventListener('play', () => {
			this.playing = true
		})
	},

	watch: {
		playing(value) {
			if (value) return this.audio.play()
			this.audio.pause()
		},
	},
	methods: {
		load() {
			if (this.audio.readyState >= 2) {
				this.loaded = true
				this.durationSeconds = parseInt(this.audio.duration)
			}
		},
		changeMedia(index) {
			this.selected = index
			this.audio.load()
			this.playing = true
			this.audio.play()
		},
		PlayPause() {
			this.playing = !this.playing
		},
		mute() {
			if (this.mute) {
				return (this.volume = this.previousVolume)
			}
			this.previousVolume = this.volume
			this.volume = 0
		},
		seek(e) {
			if (this.playing) {
				const seekbar = this.$el.querySelectorAll('#timeline')[0]
				const el = e.target.getBoundingClientRect()
				const seekPos = (e.clientX - seekbar.getBoundingClientRect().left) / this.timeline
				this.audio.currentTime = parseInt(this.audio.duration * seekPos)
			}
		},
		stop() {
			this.playing = false
			this.audio.currentTime = 0
		},
		update(e) {
			this.currentSeconds = parseInt(this.audio.currentTime)
		},
	},
}
</script>
