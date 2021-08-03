<template>
	<view class="bg-eee">
		<u-navbar :is-back="false" title="我的"></u-navbar>
		<!-- 用户 -->
		<view class="user flex ai-c">
			<image src="../../static/avatar_default.png" mode="" class="avator mr-r20" v-if="!img"></image>
			<image :src="img" mode="" class="avator mr-r20" v-if="img"></image>
			<view class="fw f14" @click="login">
				{{name}}
			</view>
		</view>
		<view class="floor">
			<!-- 我的订单 -->
			<mys :list='list' title='我的订单' v-if="list.length>0" class="order"></mys>
			<!-- 我的功能 -->
			<mys :list='list1' title='我的功能' v-if="list1.length>0" class="function"></mys>
			<!-- 更多工具 -->
			<mys :list='list2' title='更多工具' v-if="list2.length>0" class="function"></mys>
		</view>
		<zhuanRecom></zhuanRecom>
	</view>
	</view>

</template>

<script>
	import mys from '../../components/mys/mys.vue'
	import zhuanRecom from '../../components/zhuanRecom/zhuanRecom.vue'
	export default {
		components: {
			mys,
			zhuanRecom
		},
		props: {},
		data() {
			return {
				name: '请登录',
				list: [{
					title: '代付款',
					url: "../../static/user/daifukuan.png",
					link: `/pages/order/order`,
					index: 1
				}, {
					title: '待收货',
					url: "../../static/user/daishouhuo.png",
					link: `/pages/order/order`,
					index: 2
				}, {
					title: '待评价',
					url: "../../static/user/daipingjia.png",
					link: `/pages/order/order`,
					index: 3
				}, {
					title: '退款/售后',
					url: "../../static/user/shouhou.png",
					link: `/pages/order/order`,
					index: 4
				}],
				list1: [{
					title: '优惠券',
					url: "../../static/user/youhuiquan.png",
					link: "/pages/coupon/coupon"
				}, {
					title: '我的红包',
					url: "../../static/user/hongbao.png",
					link: ''
				}, {
					title: '我的收藏',
					url: "../../static/user/shoucang.png",
					link: "/pages/browse/browse"
				}, {
					title: '浏览记录',
					url: "../../static/user/liulanjilu.png",
					link: "/pages/browse/browse"
				}],
				list2: [{
						title: '我的钱包',
						url: "../../static/user/qianbao.png",
						link: ''
					}, {
						title: '官方客服',
						url: "../../static/user/kefu.png",
						link: ''
					}, {
						title: '用户反馈',
						url: "../../static/user/yonghufankui.png",
						link: ''
					}, {
						title: '资质证照',
						url: "../../static/user/zizhizhengzhao.png",
						link: ''
					},
					{
						title: '协议规则',
						url: "../../static/user/xieyiguize.png",
						link: ''
					},
					{
						title: '线下门店',
						url: "../../static/user/xianxiamendian.png",
						link: ''
					},
					{
						title: '更新日志',
						url: "../../static/user/update.png",
						link: ''
					}
				],
				img: ''
			}
		},
		methods: {
			// 点击登录
			login() {
				if (this.name === '请登录') {
					/* #ifdef MP-WEIXIN */
					wx.getUserProfile({
						desc: '登陆成功后可进行更多操作', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
						success: (res) => {
							this.img = res.userInfo.avatarUrl
							this.name = res.userInfo.nickName
							uni.setStorageSync('user', res.userInfo)
						}
					})
					/* #endif */
					/* #ifdef H5 */
					uni.navigateTo({
						url:'/pages/login/login'
					})
					/* #endif */
				}
			}

		},
		mounted() {},
		onLoad() {

		},
		onShow() {
			let a = uni.getStorageSync('user')
			// console.log(a)
			if (a) {
				/* #ifdef MP-WEIXIN */
				this.img = a.avatarUrl
				/* #endif */
				this.name = a.nickName
			}
		},
		filters: {},
		computed: {},
		watch: {},
	}
</script>

<style scoped lang="scss">
	.user {
		height: 200rpx;
		background-color: #debc6f;
		padding: 50rpx;
		.avator {
			width: 80rpx;
			height: 80rpx;
			border-radius: 100%;
		}
	}

	.floor {
		/* #ifdef MP-WEIXIN */
		padding: 20rpx;
		/* #endif */
	}

	.order {
		height: 230rpx;
		margin: -40rpx 20rpx 0;
		/* #ifdef MP-WEIXIN */
		// margin-top: -200rpx;
		/* #endif */
	}

	.function {
		margin: 20rpx;
	}
</style>
