<template class="page">
	<view class="h-100">
		<!-- 头部 -->
		<view class="head">
			<!-- #ifdef MP-WEIXIN -->
			<view class="shortcut">
			</view>
			<!-- #endif -->
			<view class="header flex ai-c cw w-100">
				<view style="margin-right: 20rpx;">
					<image src="../../static/navi_title_v6.png" mode="" style="width: 60rpx;height: 60rpx;"></image>
				</view>
				<view class="search flex ai-c">
					<image src="../../static/search.png" mode="" class="img-search"></image>
					<u-notice-bar mode="vertical" :list="placeHolderText" :volume-icon="false" color='#999' style='width: 100%;' @click="goSearch">
					</u-notice-bar>
				</view>
			</view>
		</view>
		<view class="banner pr">
			<view class="banner-bg">
			</view>
		</view>
		<view class="content">
			<!-- 轮播图 -->
			<carousel :carouselList="carouselList" v-if="carouselList.length>0" :bgimg='bgimg'></carousel>
			<!-- 每日上新 -->
			<categ :categList='categList' v-if="categList.length>0"></categ>
			<!-- 超级品牌日 -->
			<brand :brandUrl='brandUrl' v-if="brandUrl.length>0"></brand>
			<!-- 户外 -->
			<outdoor :outdoorList='outdoorList' v-if="outdoorList.length>0"></outdoor>
			<!-- 微淘众筹 -->
			<micro :microList='microList' v-if="microList.length>0"></micro>
			<!-- 热销榜 -->
			<hots :hotList='hotList' v-if="Object.keys(hotList).length>0"></hots>
			<!-- 限时 -->
			<spike :spike='spike' v-if="Object.keys(spike).length>0"></spike>
			<!-- 特卖汇 -->
			<sale :sale='sale' v-if="Object.keys(sale).length>0"></sale>
			<!-- 推荐 -->
			<recom :recom='recom' v-if="Object.keys(recom).length>0"></recom>
		</view>
	</view>

</template>

<script>
	import carousel from '../../components/carousel/carousel.vue'
	import categ from '../../components/categ/categ.vue'
	import brand from '../../components/brand/brand.vue'
	import outdoor from '../../components/outdoor/outdoor.vue'
	import micro from '../../components/micro/micro.vue'
	import hots from '../../components/hots/hots.vue'
	import spike from '../../components/spike/spike.vue'
	import sale from '../../components/sale/sale.vue'
	import recom from '../../components/recom/recom.vue'
	export default {
		components: {
			carousel,
			categ,
			brand,
			outdoor,
			micro,
			hots,
			spike,
			sale,
			recom,
		},
		props: {},
		data() {
			return {
				keyword: '',
				placeHolderText: [],
				flag: true,
				carouselList: [],
				// 背景图片
				bgimg: {},
				categList: [],
				// 超级品牌日
				brandUrl: [],
				// 影音户外
				outdoorList: [],
				// 众筹
				microList: [],
				// 热销榜
				hotList: {},
				// 限时购
				spike: {},
				// 特卖汇
				sale: {},
				// 推荐
				recom: {},
			}
		},
		methods: {
			// 获取占位词
			placeHolder() {
				this.$api.placeHolder().then(res => {
					res = this.$utils.trriger(res)
					res.data.map(item => {
						this.placeHolderText.push(item.queryName)
					})
					// console.log(this.placeHolderText)
				}).catch(err => {
					console.log('站为此请求失败', err)
				})
			},
			// 首页数据
			getHomeData() {
				this.$api.HomeData().then(res => {
					res = this.$utils.trriger(res)
					// console.log(res)
					// 轮播图
					this.carouselList = res.homepage.floors[1].data.items
					this.bgimg = res.feeds.themeMap
					// 每日上新
					this.categList = res.homepage.floors[2].data.items
					// 超级品牌日
					this.brandUrl.push(res.homepage.floors[3].data._hotspot)
					this.brandUrl.push(res.homepage.floors[4].data)
					// 影音户外
					res.homepage.floors[5].data.rows[0].items.map(item => {
						this.outdoorList.push(item)
					})
					res.homepage.floors[5].data.rows[1].items.map(item => {
						this.outdoorList.push(item)
					})
					// console.log(this.outdoorList)
					// 众筹
					this.microList = res.homepage.floors[7].data.items
					// 热销榜
					this.hotList = res.homepage.floors[8].data
					// 限时购
					this.spike = res.homepage.floors[9]
					// 特卖汇
					this.sale = res.homepage.floors[10]
					// 推荐
					this.recom = res.homepage.floors[11]
				}).catch(err => {
					console.log('首页请求数据失败', err)
				})
			},
		goSearch(index){
			uni.navigateTo({
				url:`../search/search?text=${this.placeHolderText[index]}`
			})
		}
		},
		mounted() {
			// #ifdef MP-WEIXIN
			this.flag = false
			// #endif
			this.placeHolder()
			this.getHomeData()
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

<style lang="scss" scoped>
	.head {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 99;
	}
	.banner {
		width: 100%;
		background-color: #FFFFFF;
	}

	.banner-bg {
		position: absolute;
		left: -25%;
		width: 150%;
		height: 200rpx;
		background-color: #ff806d;
		border-bottom-left-radius: 100%;
		border-bottom-right-radius: 100%;
	}

	.shortcut {
		height: 50rpx;
		background-color: #ff806d;
	}

	.header {
		height: 95rpx;
		background-color: #ff806d;
		padding-left: 20rpx;
	}

	.search {
		height: 60rpx;
		width: 60rpx;
		width: 85%;
		/* #ifdef MP-WEIXIN */
		width: 50%;
		height: 70rpx;
		/* #endif */
		border-radius: 35rpx;
		background-color: rgba(255, 255, 255, .7);
		padding-left: 40rpx;
		.img-search {
			height: 40rpx;
			width: 40rpx;
		}
		.u-notice-bar-wrap {
			width: 100%;
		}
	}

	.content {
		margin-top: 95rpx;
		/* #ifdef MP-WEIXIN */
		margin-top: 145rpx;
		/* #endif */
		background-color: #c9524d;
	}

	.footer {
		height: 120rpx;
	}
</style>
