<template>
	<view class="flex flex-c mr-top20">
		<view class="hots bg-fff">
			<view class="hd flex flex-b ai-c">
				<view class="left flex ai-c">
					<view class="f16 fw title">
						{{hotList.title}}
					</view>
					<view class="color-a0a0">
						{{hotList.subtitle}}
					</view>
				</view>
				<view class="more color-a0a0">
					更多 >
				</view>
			</view>
			<view class="bd scroll_box">
				<scroll-view scroll-x="true" class="mr-top20" show-scrollbar=''>
					<view class="flex">
						<view class="item boder-r10 pr" v-for="(item,index) in hotList.items" :key='index' @click="go(item.item.jump_url)">
							<view class="flex ai-c flex-c">
								<image :src="item.item.pic_url" mode="" class="img"></image>
							</view>
							<view class="recommend cw">
								{{item.item.recommend}}
							</view>
							<view class="name ta-c">
								{{item.item.name}}
							</view>
							<view class="rank">
								<view class="tag flex flex-c ai-c co-red fw" :class="{'bg-eee':2<index,'color-999':2<index}">
									{{numList[index]}}
								</view>
								<view class="sanjiao" :class="{'sanjiao1':2<index}">
									
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
			hotList: {
				type: Object,
				required: true
			}
		},
		data() {
			return {
				numList:[1,2,3,4,5,6,7,8,9]
			}
		},
		methods: {
			// 跳转
			go(url){
				this.$utils.go(url)
			}
		},
		mounted() {
// console.log(this.hotList)
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
	.hots {
		height: 400rpx;
		width: 92%;
		padding: 20rpx;
		border-radius: 10rpx;
		overflow: hidden;

		.title {
			margin-right: 10rpx;
		}

		.bd {
			.item {
				.rank {
					position: absolute;
					top: 0;
					left: 0;
					.tag {
						height: 30rpx;
						width: 30rpx;		
						background-color: #f4d9a8;
						color: red;
					}
					.sanjiao {
						    width: 0;
						    height: 0;
						    border-left: 15rpx solid transparent;
						    border-right: 15rpx solid transparent;
						    border-top: 10rpx solid #f4d9a8;
					}
					.sanjiao1 {
						width: 0;
						height: 0;
						border-left: 15rpx solid transparent;
						border-right: 15rpx solid transparent;
						border-top: 10rpx solid #eee;
					}
				}
				width: 220rpx;
				background-color: #f9f7f9;
				margin-right: 20rpx;
				.img {
					height: 200rpx;
					width: 205rpx;
				}
				.recommend {
					padding: 0 10rpx;
					height: 30rpx;
					line-height: 30rpx;
					background-color: #ec6535;
					text-overflow: ellipsis; overflow: hidden; white-space: nowrap;
				}
				.name {
					background-color: #f8daab;
					width: 100%;
					height: 60rpx;
					color: #885e30;
					line-height: 80rpx;
				}
			}
		}
	}
</style>
