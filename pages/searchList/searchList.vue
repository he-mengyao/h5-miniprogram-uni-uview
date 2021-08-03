<template>
	<view class="bg-purple">
		<u-navbar back-text=" " title="商品列表"></u-navbar>
		<view class="flex ai-c pd-20">
			<u-search placeholder=" " search-icon-color='#ffffff' v-model="value" :show-action="false"
				bg-color='#ffffff' style='width: 100% !important;' @search='search(value)' @custom='search(value)'></u-search>
			<image src="../../static/icon/arrange_list_black.png" mode="" class="arrange" @click="change"></image>
		</view>
		<view class="flex ai-c nav flex-a pd-20">
			<view class="color-333 nav-item flex-1 flex ai-c flex-c" v-for="(item,index) in navlist" :key='index'
				@click="changenav(item,index)" :class="{'co-red':index===current}">
				<view class="name">
					{{item.name}}
				</view>
				<u-icon v-if='index===0 || (index===2 && show===false)' name="arrow-down"></u-icon>
				<u-icon v-if='index===2 && show===true' name="arrow-up"></u-icon>
				<image v-if="index===4" src="../../static/icon/shaixuan.png" mode="" class="shaixuan"></image>
			</view>
		</view>
		<view class="recom" v-if="list.length>0">
			<view class="scroll_box">
				<view class="recom-bd flex wrap">
					<view class="bg-fff boder-r10 pd-20" v-for="(item,index) in list" :key='index'
						:class="flag?'rec-item ':'shu'" @click="detail(item)">
						<view class="rec-pic">
							<image :src="item.data.goodsInfo.img800s" mode="" class="rec-pic"></image>
						</view>
						<view class="lue1">
							<view class="title f14 lue1">
								{{item.data.goodsInfo.name}}
							</view>
							<view class="subtitle color-a0a0 lue1">
								{{item.data.goodsInfo.summary}}
							</view>
							<view class="price flex">
								<view class="co-red fw">
									￥{{item.data.goodsInfo.priceMin/100}}
								</view>
								<view class="del color-a0a0">
									￥{{item.data.goodsInfo.marketPrice/100}}
								</view>
							</view>
							<view class="tag flex" v-if="item.data.label">
								<view class="cw" v-for="(item1,index1) in item.data.label.doubleRow">
									<view class="" v-if="index1<2" :class="{'tag-item':index<2}">
										{{item1.text}}
									</view>
								</view>
							</view>
							<view class="price flex">
								<view class="co-red fw mr-r20">
									{{item.data.comment.count}}评论
								</view>
								<view class="f12 color-a0a0" v-if="item.data.comment.positiveRate">
									{{item.data.comment.positiveRate}}%好评
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="flex flex-c pd-20 ai-c f16 fw bg-fff" v-if="list.length===0">
			暂无数据
		</view>
	</view>

</template>

<script>
	export default {
		components: {},
		props: {},
		data() {
			return {
				value: '',
				source: 'searchPage',
				navlist: [{
					name: '综合',
					sid: 0
				}, {
					name: '新品',
					sid: 8
				}, {
					name: '价格',
					sid: 2
				}, {
					name: '信用',
					sid: 6
				}, {
					name: '筛选',
					sid: ''
				}],
				list: [],
				flag: true,
				current: 0,
				// 价格降序
				show:false
			}
		},
		methods: {
			// 获取商品列表
			doSearch(sid) {
				this.$api.doSearch([{
						queryName: this.value,
						queryType: 0,
						rule: []
					}],
					sid,
					'searchPage').then(res => {
					res = this.$utils.trriger(res)
					this.list = res.data.data.goods
					// console.log(this.list)
				}).catch(err => {
					console.log('商品列表获取失败')
				})
			},
			// 切换排向
			change() {
				this.flag = !this.flag
			},
			// 点击导航
			changenav(item,index) {
				this.current=index
				if (item.sid !== '') {
					if (item.sid===2){
						this.show=true
						item.sid=1
					}else if (item.sid===1){
						this.show=false
						item.sid=2
					}
					this.doSearch(item.sid)
				}
			},
			// 搜索
			search(value){
				this.value=value
				this.doSearch(0)
			},
			// 点击进详情
			detail(item){
				uni.navigateTo({
					url:`/pages/productDetail/productDetail?id=${item.data.goodsInfo.gid}`
				})
			}

		},
		mounted() {

		},
		onLoad(options) {
			this.value = options.value
			// console.log(options.value)
			this.doSearch(0)
		},
		onShow() {

		},
		filters: {},
		computed: {},
		watch: {},
	}
</script>

<style scoped lang="scss">
	.arrange {
		height: 60rpx;
		width: 60rpx;
	}

	.nav {
		height: 80rpx;

		.name {
			margin-right: 10rpx;
		}

		.shaixuan {
			height: 30rpx;
			width: 30rpx;
		}
	}

	.recom {
		margin-top: 20rpx;
		background-color: #f8f7fa;

		.shu {
			margin-top: 22rpx;
			margin-left: 24rpx;
			/* #ifdef MP-WEIXIN  */
			width: 670rpx;
			height: 300rpx;
			/* #endif */
			/* #ifdef H5 */
			width: 700rpx;
			height: 280rpx;
			/* #endif */
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		.rec-item {
			margin-top: 22rpx;
			margin-left: 24rpx;
			/* #ifdef MP-WEIXIN  */
			width: 306rpx;
			height: 515rpx;
			/* #endif */
			/* #ifdef H5 */
			width: 340rpx;
			height: 500rpx;
			/* #endif */
		}

		.rec-pic {
			width: 280rpx;
			height: 280rpx;
		}

		.tag-item {
			padding: 5rpx;
			background-color: #cf7071;
			margin-right: 20rpx;
		}
	}
</style>
