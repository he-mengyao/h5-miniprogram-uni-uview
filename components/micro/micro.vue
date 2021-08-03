<template>
	<view class="flex flex-c">
		<view class="micro">
			<view class="title flex flex-b ai-c">
				<view class="f16">
					微淘众筹
				</view>
				<view class="more">
					更多 >
				</view>
			</view>
			<view class="content1 flex wrap flex-b">
				<view v-for="(item,index) in microList" :key="index" :class="{'w-100':index==0}" class="item" @click="go(item.item.jump_url)">
					<view class="content-title f14">
						{{item.item.name}}
					</view>
					<view class="content-body flex flex-b">
						<view class="">
							<view class="summary" v-if="index<1">
								{{item.item.summary}}
							</view>
							<view class="price fw f14 color-red">
								￥{{String(item.item.price_min).substr(0,4)}}
							</view>
						</view>
						<view class="">
							<image :src="item.item.pic_url" mode="" class="img1" :class="{'img':index==0}"></image>
						</view>
					</view>
					<view class="content-footer flex">
						<view :style="{'background':item.item.tags[0].attr.bg_color}" class="cw tag">
							{{item.item.tags[0].text}}
						</view>
						支持人数<view class="count">
							{{item.item.saled_count}}
						</view><view v-if="index===0" class="flex">
							/完成度<view class="count">
								{{item.item.progress}}%
							</view>
						</view>
					</view>
					<view class="line">

					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		props: {
			microList: {
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
		// console.log(this.microList)
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
	.micro {
		position: relative;
		width: 92%;
		padding: 20rpx 15rpx;
		border-radius: 10rpx;
		overflow: hidden;
		z-index: 2;

		&::before {
			content: '';
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			z-index: -1;
			background: url("https://img.youpin.mi-img.com/jianyu/e500bfb5beb9be9b0987d624df06fa69.png?w=516&h=258") no-repeat;
			transform: rotate(180deg);
			background-size: cover;
		}
		.title {
			height: 60rpx;
		
			.more {
				color: #999;
			}
		}
		.content1 {
			.item {
				width: 48%;
			}
			.w-100 {
				width: 100%;
			}
			.content-title {
				margin-top: 20rpx;
				color: #3b393b;
			}
			.content-body {
				
				.summary {
					margin: 10rpx 0;
					display: -webkit-box;
					background-color: #fef9e6;
					width: 100%;
					overflow: hidden;
					text-overflow: ellipsis;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
				}
				
				.img {
					width: 200rpx;
					height: 200rpx;
				}
				.img1 {
					width: 150rpx;
					height: 150rpx;
				}
				
			}
			.content-footer {
				.tag {
					padding: 0 5rpx;
					margin-right: 10rpx;
				}
				.count {
					color: #e39c6c;
					margin: 0 5rpx;
				}
			}
			.line {
				margin-top: 10rpx;
				height: 10rpx;
				width: 100%;
				border-radius: 5rpx;
				background: linear-gradient(to right, #f6c977, #ec6436);
			}
		}
	}
</style>
