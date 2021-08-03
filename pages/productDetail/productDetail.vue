<template>
	<view>
		<!-- 导航 -->
		<view class="nav flex flex-a cw ai-c">
			<u-icon name="arrow-left" color="#ffffff" size="40" @click='back'></u-icon>|
			<u-icon name="list" color="#ffffff" size="40" class='ic'></u-icon>
		</view>
		<!-- 详情图 -->
		<video11 :carouselMapList='carouselMapList' v-if="carouselMapList.length>0"></video11>
		<view class="bd">
			<!-- 商品价格 -->
			<priceDetail :goods='goods' v-if="Object.keys(goods).length>0"></priceDetail>
			<!-- 商品规格 -->
			<infoDetail :goods='goods' v-if="Object.keys(goods).length>0 && Object.keys(serviceInfo).length>0" :serviceInfo='serviceInfo'></infoDetail>
			<!-- 排行榜 -->
			<rank :ids="id" v-if="id"></rank>
			<!-- 用户评价 -->
			<comment :comment='comment' v-if="Object.keys(comment).length>0 && id !== ''" :ids="id"></comment>
			<!-- 问大家 -->
			<ask :ids="id" v-if="id"></ask>
			<!-- 推荐 -->
			<recom1></recom1>
			<!-- 进入店铺 -->
			<dian :goods='goods' v-if="Object.keys(goods).length>0"></dian>
			<!-- 产品详情 -->
			<questions :goods='goods' v-if="Object.keys(goods).length>0"></questions>
		</view>
	</view>

</template>

<script>
	import video11 from '../../components/video11/video11.vue'
	import priceDetail from '../../components/priceDetail/priceDetail.vue'
	import infoDetail from '../../components/infoDetail/infoDetail.vue'
	import rank from '../../components/rank/rank.vue'
	import comment from '../../components/comment/comment.vue'
	import ask from '../../components/ask/ask.vue'
	import recom1 from '../../components/recom1/recom1.vue'
	import dian from '../../components/dian/dian.vue'
	import questions from '../../components/questions/questions.vue'
	export default {
		components: {
			video11,priceDetail,infoDetail,rank,comment,ask,recom1,dian,questions
		},
		props: {},
		data() {
			return {
				id: "",
				goods: {},
				carouselMapList: [],
				serviceInfo:{},
				comment:{}
			}
		},
		methods: {
			// 获取详情数据
			getData(id) {
				this.$api.productdetail(id).then(res => {
					res = this.$utils.trriger(res)
					this.goods = res.data.goods
					// 详情图
					this.carouselMapList = res.data.goods.carouselMapList
					// 说明
					this.serviceInfo=res.data.serviceInfo
					// 评论
					this.comment = res.data.comment
					// 存浏览记录
					this.$utils.saveHistory({
						key:'browse',
						data:res.data.goods.goodsInfo,
						attr:'gid'
					})
				}).catch(err => {
					console.log('商品详情请求失败', err)
				})
			},
			// 返回
			back() {
				uni.navigateBack()
			},
		},
		mounted() {

		},
		onLoad(options) {
			this.id = options.id
			this.getData(this.id)
			// console.log(this.id, 111)
		},
		onShow() {

		},
		filters: {},
		computed: {},
		watch: {},
	}
</script>

<style scoped lang="scss">
	.nav {
		position: fixed;
		left: 20rpx;
		top: 20rpx;
		/* #ifdef MP-WEIXIN */
		top: 70rpx;
		/* #endif */
		z-index: 99999;
		width: 180rpx;
		height: 60rpx;
		background-color: rgba(0, 0, 0, .15);
		border-radius: 30rpx;
	}
	.bd {
		background-color: #fbf9fb;
		/* #ifdef H5 */
		padding-bottom: 100rpx;
		/* #endif */
	}
</style>
