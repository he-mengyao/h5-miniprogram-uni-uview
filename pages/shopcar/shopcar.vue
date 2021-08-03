<template>
	<view>
		<u-navbar :is-back="false" title="购物车" :background="background"></u-navbar>
		<!-- 内容 -->
		<view class="bd">
			<view class="content">
				<view class="" v-if="list.length>0">
					<view class="content-bd">
					</view>
					<view class="pro bg-fff boder-r10 mr-l20 mr-r20">
						<view class="hd flex flex-b ai-c pd-20">
							<view class="left fw f14">
								<u-checkbox-group>
									<u-checkbox v-model="checked" shape="circle" @change='change'>微淘精选</u-checkbox>
								</u-checkbox-group>
							</view>
							<view class="right flex ai-c color-333">
								<image src="../../static/tips.png" mode="" class="tip "></image>
								满99元免运费
							</view>
						</view>
						<view class="item flex ai-c mr-top20 pd-20" v-for="(item,index) in list" :key='index'>
							<u-checkbox-group>
								<u-checkbox @change="checkboxChange($event,item)" v-model="item.checked" shape="circle"
								></u-checkbox>
							</u-checkbox-group>
							<view class="img" style="">
								<image :src="item.picUrl" mode="" class="img" @click="detail(item)"></image>
							</view>
							<view class="flex col right" style="width: 60%;" @click="detail(item)">
								<view class="">
									<view class="lue1">
										{{item.name}}
									</view>
									<view class="color-a0a0 flex lue1">
										<view class="mr-r20" :class="{'lue1':index===1}" v-for="(item1,index1) in item.norm" :key='index1'>
											{{item1}}
										</view>
									</view>
								</view>
								<br>
								<view class="flex flex-b">
									<view class="co-red fw f14">
										￥{{item.priceMin/100}}
									</view>
									<u-number-box v-model="item.count" @change="valChange(item)"></u-number-box>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="empty flex col ai-c" v-else>
					<u-empty :text='text' mode="list"></u-empty>
					<view class="color-zong btn flex flex-c ai-c" @click="click">
						{{text==='检测到您未登录，请先登录'?'登录':'去逛逛'}}
					</view>
				</view>
			</view>
			<weiniRecom class="ftr"></weiniRecom>
			<view class="footer flex flex-b ai-c pd-20">
				<view class="left fw f14">
					<u-checkbox-group>
						<u-checkbox v-model="checked" shape="circle" @change='change'>全选</u-checkbox>
					</u-checkbox-group>
				</view>
				<view class="flex ai-c">
					合计：<view class="co-red fw mr-r20">
						￥{{sum.toFixed(2)}}
					</view>
					<view class="settle f14 flex flex-c ai-c cw" @click="settle">
						结算
					</view>
				</view>
			</view>
			<!-- 弹框 -->
			<view>
				<u-modal v-model="show" content="您确认删除这件商品吗？" @confirm='confirm' @cancel='cancel'
					:show-cancel-button='true'></u-modal>
			</view>
		</view>
	</view>

</template>

<script>
	import weiniRecom from '../../components/weiniRecom/weiniRecom.vue'
	export default {
		components: {
			weiniRecom
		},
		props: {},
		data() {
			return {
				list: [],
				// 商品状态
				text: '检测到您未登录，请先登录',
				background: {
					backgroundColor: '#debc6f',
				},
				checked: false,
				checkedList: [],
				// 弹框
				show: false,
				item: {},
			}
		},
		methods: {
			// 点击登录或者逛一逛
			click() {
				if (this.text === '购物车还没有商品哦~') {
					uni.navigateTo({
						url: '/pages/home/home'
					})
				} else {
					/* #ifdef MP-WEIXIN */
					wx.getUserProfile({
						desc: '登陆成功后可进行更多操作', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
						success: (res) => {
							this.img = res.userInfo.avatarUrl
							this.name = res.userInfo.nickName
							uni.setStorageSync('user', res.userInfo)
							this.text = '购物车还没有商品哦~'
						}
					})
					/* #endif */
					/* #ifdef H5 */
					uni.navigateTo({
						url: '/pages/login/login'
					})
					/* #endif */
				}
			},
			// 点击加减
			valChange(item) {
				// console.log(item)
				if (item.count === 0) {
					this.show = true
					this.item = item
				} else {
					uni.setStorageSync('cartsHistory',this.list)
				}
			},
			// 确认
			confirm(e) {
				this.list = this.list.filter(i => {
					return i.norm.toString() !== this.item.norm.toString()
				})
				uni.setStorageSync('cartsHistory', this.list)
			},
			// 取消
			cancel() {
				this.show = false;
				this.item.count = 1
				this.list = this.list.filter(i => {
					return i.norm.toString() !== this.item.norm.toString()
				})
				this.list.unshift(this.item)
			},
			// 点击商品
			detail(item){
				uni.navigateTo({
					url:`/pages/productDetail/productDetail?id=${item.gid}`
				})
			},
			// 得到商品列表
			getData() {
				let arr = this.$utils.getHistory({
					key: 'carts'
				})
				if (arr) {
					this.list = arr
				}
				this.list.map(item => {
					this.$set(item, 'checked', false)
				})
			},
			// 点击全选
			change(e) {
				// console.log(e.value)
				this.list.map(item => {
					item.checked = e.value
				})
			},
			// 选中商品
			checkboxChange(e, item) {
				item.checked = e.value
				this.checked = this.list.every(item => {
					return item.checked === true
				})
			},
			// 点击结算
			settle(){
				let flag = this.list.some(item1=>{
					return item1.checked===true
				})
				if (flag){
					uni.showToast({
						title:`结算成功，共${this.sum}元`,
						icon:'none'
					})
					// 全选取消
					this.checked=false
					// 购物车列表
					let list1=this.list.filter(item=>{
						return item.checked !==true
					})
					// 结算列表
					let list2 = this.list.filter(item=>{
						return item.checked ===true
					})
					let obj = {
						time:new Date(),
						sum:this.sum,
						data:list2
					}
					// 存购物车订单
					uni.setStorageSync('cartsHistory',list1)
					// 存结算订单
					let n = uni.getStorageSync('orderList')
					if (n){
						n.unshift(obj)
						uni.setStorageSync('orderList',n)
					}else {
						let arr = []
						arr.unshift(obj)
						uni.setStorageSync('orderList',arr)
					}
					this.getData()
				}else {
					uni.showToast({
						title:`请先选择商品`,
						icon:'none'
					})
				}
			}
		},
		mounted() {

		},
		onLoad() {},
		onShow() {
			let a = uni.getStorageSync('user')
			if (a) {
				this.text = "购物车还没有商品哦~"
			}
			this.getData()
		},
		filters: {},
		computed: {
			sum() {
				let sum1 = 0
				this.list.map(item => {
					if (item.checked === true) {
						sum1 += item.priceMin / 100 * item.count
					}
				})
				return sum1
			}
		},
		watch: {},
	}
</script>

<style scoped lang="scss">
	.bd {
		background-color: #f8f7fa;
		height: 100vh;

		.content-bd {
			height: 100rpx;
			background-color: #debc6f;
		}

		.pro {
			margin-top: -50rpx;

			.tip {
				margin-right: 10rpx;
				height: 20rpx;
				width: 20rpx;
			}

			.item {
				.img {
					height: 200rpx;
					width: 200rpx;
				}
			}
		}

		.content {
			.empty {
				padding-top: 50rpx;

				.btn {
					height: 60rpx;
					width: 200rpx;
					border: 1px solid #826e58;
					border-radius: 30rpx;
				}
			}
		}
	}

	.footer {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 95rpx;
		background-color: #FFFFFF;
		height: 100rpx;

		.settle {
			height: 60rpx;
			width: 150rpx;
			background-color: #cb3529;
			border-radius: 30rpx;
		}
	}
	.ftr {
		/* #ifdef H5 */
		padding-bottom: 200rpx;
		/* #endif */
	}
</style>
