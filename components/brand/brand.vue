<template>
	<view class="flex col ai-c brand">
		<image :src="brandUrl[1].pic_url" mode="" class="img1" @click="go(brandUrl[1].pic_jump_url)"></image>
		<image :src="brandUrl[0].image" mode="" class="img2" ></image>
	</view>

</template>

<script>
	export default {
		components: {},
		props: {
			brandUrl: {
				type: Array,
				required: true
			}
		},
		data() {
			return {}
		},
		methods: {
			// 跳转
			go(url){
				this.$utils.go(url)
			}
		},
		mounted() {
			// console.log((this.brandUrl))
		},
		onLoad() {

		},
		onShow() {

		},
		filters: {},
		computed: {},
		watch: {},
	}
</script>

<style scoped lang="scss">
	.brand {
		background-color: #FFFFFF;
		.img1 {
			padding-top: 20rpx;
			width: 100%;
			height: 160rpx;
		}

		.img2 {
			width: 100%;
			height: 180rpx;
		}
	}
</style>
