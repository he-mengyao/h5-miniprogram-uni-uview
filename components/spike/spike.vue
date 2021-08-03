<template>
	<view class="flex flex-c mr-top20">
		<view class="spike bg-fff boder-r10 pd-20">
			<view class="hd flex ai-c flex-b">
				<view class="flex ai-c">
					<view class="f16 fw">
						限时购
					</view>
					<view class="time color-333">
						{{spike.lt}}点场
					</view>
					<view class="time1 flex">
						<view class="time2  cw">
							00
						</view>: 
						<view class="time2  cw">
							00
						</view>: 
						<view class="time2  cw">
							00
						</view>
					</view>
				</view>
				<view class="more color-a0a0">
					更多 >
				</view>
			</view>
			<view class="bd scroll_box">
				<scroll-view scroll-x="true" >
					<view class="flex">
						<view class="item boder-r10" v-for="(item,index) in spike.data.goods" :key='index' @click="go(item.item.jump_url)">
							<image :src="item.item.imgs.img_square" mode="" class="img"></image>
							<view class="price flex">
								<view class="flash_price color-red fw">
									￥ {{String(item.item.flash_price).slice(0,4)}}
								</view>
								<view class="market_price color-a0a0 del">
									￥ {{String(item.item.market_price).slice(0,4)}}
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		components: {},
		props: {
			spike: {
				type: Object,
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
			// console.log(this.spike)
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
	.spike {
		width: 92%;

		.time {
			margin: 0 10rpx 0 15rpx;
		}

		.time1 {
			color: #c39653;
		}

		.time2 {
			height: 30rpx;
			width: 30rpx;
			line-height: 30rpx;
			background-color: #ba9763;
			border-radius: 5rpx;
		}
		.bd {
			.item {
				margin: 20rpx 20rpx 0 0;
				border-radius: 10rpx;
				.img {
					width: 200rpx;
					height: 200rpx;
					border-radius: 10rpx;
				}
				.price {
					.flash_price {
						margin-right: 10rpx;
					}
				}
			}
		}
	}
</style>
