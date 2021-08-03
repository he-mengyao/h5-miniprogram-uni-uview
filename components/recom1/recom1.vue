<template>
	<view class="bg-fff">
		<view class="hd flex ai-c flex-c mr-top20">
			<view class="title flex ai-c flex-c color-zong f14">
				为你推荐
			</view>
		</view>
		<view class="bd flex wrap bg-purple">
			<view class="item bg-fff mr-l20 mr-top20 pd-20" v-for="(item,index) in recommendResponseList" 
			:key='index' @click="go(item)">
				<view class="pr flex col ai-c">
					<image :src="item.data.goods.picUrl" mode="" class="img"></image>
					<view class="label pa flex cw">
						<view class="tag mr-l20 f10" v-for="(item1,index1) in item.data.goods.labels" :key='index1' :style="{'background':item1.attrs.bgColor}">
							{{item1.text}}
						</view>
					</view>
				</view>
				<view class="name lue1 mr-tb10">
					{{item.data.goods.name}}
				</view>
				<view class="co-red fw">
					￥{{item.data.goods.priceMin/100}}
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		components: {},
		props: {},
		data() {
			return {
				list: [],
				type: '7',
				limit: '6',
				offset: '1',
				recommendResponseList: []
			}
		},
		methods: {
			// 获取推荐
			recommend(type, offset, limit) {
				this.$api.recommend(type, offset, limit).then(res => {
					res = this.$utils.trriger(res)
					this.recommendResponseList = res.data.recommendResponseList.slice(0,6)
					// console.log(this.recommendResponseList)
				}).catch(err => {
					console.log('推荐列表获取失败', err)
				})
			},
			// 下拉加载
			scrolltolower() {
				this.offset++
				this.recommend(this.type, this.offset, this.limit)
			},
			// 点击商品
			go(item){
				this.$utils.go(item.data.goods.jumpUrl)
			}
		},
		mounted() {
			this.recommend(this.type, this.offset, this.limit)
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
	.hd {
		height: 80rpx;

		.title {
			height: 60rpx;
			border-bottom: 1px solid #826e58;
		}
	}
	.item {
		width: 223rpx;
		height: 310rpx;
		/* #ifdef MP-WEIXIN */
		width: 190rpx;
		height: 310rpx;
		/* #endif */
		.img {
			width: 200rpx;
			height: 200rpx;
		}
		.label {
			bottom: 0;
			left: -40rpx;
			.tag {
				padding: 0 10rpx;
				height: 40rpx;
			}
		}
	}
</style>
