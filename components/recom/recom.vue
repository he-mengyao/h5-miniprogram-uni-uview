<template>
	<view class="mr-top20 bg-fff">
		<u-sticky class='sticky' :offset-top='offset'>
			<view class="scroll_box bg-fff">
				<scroll-view scroll-x="true">
					<view class="flex">
						<view class="item flex col ai-c pr" v-for="(item,index) in recom.data.items" :key='index'
							@click="click(item,index)">
							<view class="title f14 fw" :class="{'active':index===current}">
								{{index===0?'推荐':item.title}}
							</view>
							<view class="subtitle color-a0a0" :class="{'active':index===current}">
								{{item.tabConfig.subtitle}}
							</view>
							<view :class="{'line':index===current}"></view>
							<view class="border">
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</u-sticky>
		<scroll-view scroll-y="true" @scrolltolower="scrolltolower" style="height: 100vh;">
			<view class="bd flex wrap">
				<view class="content boder-r10 overflow pd-20 lue1" v-for="(item,index) in list" :key='index'
					v-if="item.data.goods" @click="detail(item.data.goods.gid)">
					<image :src="item.data.goods.imgSquare" mode="" class="img"></image>
					<view class="">
						{{item.data.goods.name}}
					</view>
					<view class="color-a0a0">
						{{item.data.goods.summary}}
					</view>
					<view class="flex flex-b">
						<view class="flex">
							<view class="color-red fw f12 price">
								￥{{(item.data.goods.priceMin)/100}}
							</view>
							<view class="del fw color-a0a0">
								￥{{(item.data.goods.marketPrice)/100}}
							</view>
						</view>
						<view class="">
							<image src="../../static/icon/menu/mini_menu.png" mode="" class="dian"></image>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>

</template>

<script>
	export default {
		components: {},
		props: {
			recom: {
				type: Object,
				required: true
			}
		},
		data() {
			return {
				current: 0,
				// 商品列表
				list: [],
				offset:0,
				id:''
			}
		},
		methods: {
			// 点击导航栏
			click(item, index) {
				this.current = index;
				this.offset=index
				this.id=item.query_id
				this.list=[]
				this.getData()
			},
			getData() {
				this.$api.feeds(this.offset, this.id).then(res => {
					res = this.$utils.trriger(res)
					this.list = this.list.concat(res.data.feeds.items)
				}).catch(err => {
					console.log('请求推荐数据失败', err)
				})
			},
			// 下拉加载
			scrolltolower() {
				this.offset++
				this.getData()
			},
			// 点击进入详情
			detail(id){
				// console.log(id)
				uni.navigateTo({
					url:`/pages/productDetail/productDetail?id=${id}`
				})
			}
		},
		mounted() {
			/* #ifdef MP-WEIXIN */
			this.offset= 145
			/* #endif */
			/* #ifdef H5 */
			this.offset=0
			/* #endif */
			this.getData('0', '')
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
	.item {
		padding: 20rpx;

		.line {
			height: 8rpx;
			width: 60rpx;
			background-color: red;
			margin-top: 10rpx;
			border-radius: 5rpx;
		}

		.border {
			position: absolute;
			top: 40%;
			right: 0;
			height: 30rpx;
			width: 3rpx;
			background-color: #eee;
		}
	}

	.bd {
		.content {
			margin: 20rpx 0 0 20rpx;
			background-color: #f4f2f4;
			width: 46%;
			/* #ifdef MP-WEIXIN */
			width: 41%;

			/* #endif */
			.img {
				width: 305rpx;
				height: 300rpx;
			}

			.price {
				margin-right: 5rpx;
			}

			.dian {
				width: 20rpx;
				height: 5rpx;
			}
		}
	}
</style>
