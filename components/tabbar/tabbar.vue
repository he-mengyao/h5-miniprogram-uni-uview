<template>
		<view class="head" :style="{'background-color':color}">
			<!-- #ifdef MP-WEIXIN -->
			<view class="shortcut">
			</view>
			<!-- #endif -->
			<view class="header flex ai-c w-100 flex-c pr">
				<view class="left pa">
					<slot name="left"></slot>
				</view>
				<view class="middle">
					<slot name="middle"></slot>
				</view>
			</view>
		</view>

</template>

<script>
	export default {
		components: {},
		props: {
			color:{
				type:String,
				required:true
			}
		},
		data() {
			return {
			}
		},
		methods: {
		},
		mounted() {
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
	.head {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 99;
		.shortcut {
			height: 50rpx;
		}
		.header {
			height: 95rpx;
			padding-left: 20rpx;
			.left {
				top: 0;
				left: 20rpx;
			}
		}
	}
</style>
