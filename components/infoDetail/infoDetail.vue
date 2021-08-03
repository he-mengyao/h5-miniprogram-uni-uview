<template>
	<view class="mr-top20 bg-fff pd-20">
		<view class=" color-a0a0">
			<view class=" flex flex-b ai-c hd" @click='select1(1)'>
				<view class="flex">
					<view class="" v-if="list.length===0">
						请选择商品
					</view>
					<view class="flex" v-if="list.length>0">
						<view class="tag1">
							已选
						</view>
						<view class="color-999 mr-l20 lue1 flex" style="width: 80%;">
							<view class="mr-r20" :class="{'lue1':index===1}" v-for="(item,index) in list" :key='index'>
								{{item}}
							</view>
						</view>
					</view>
				</view>
				<u-icon name="arrow-right" size='30' color="#999999" class='right'></u-icon>
				<!-- 弹出层 -->
				<u-popup v-model="show" mode='bottom' height='48%' border-radius="14" :closeable='true'>
					<scroll-view scroll-y="true" style="height: 550rpx" class="pd-20">
						<view class="flex ai-c">
							<image :src="goods.goodsInfo.picUrl" mode="" class="img"></image>
							<view class="color-333">
								<view class="">￥{{goods.goodsInfo.priceMin/100}}</view>
								<view class="flex ai-c ">
									<view class="" style="width: 150rpx;">
										已选：
									</view>
									<view class="flex ai-c flex-c" style="width:70%">
										<view class="mr-r20" :class="{'lue1':index===1}" v-for="(item,index) in list"
											:key='index'>
											{{item}}
										</view>
									</view>
								</view>
							</view>
						</view>
						<view v-for="(item,parentIndex) in shoptags" :key='parentIndex' class="	">
							<view class="color-a0a0 mr-top20">
								{{item.name}}
							</view>
							<view class="flex ai-c wrap">
								<view class="color-333 mr-l20 mr-top20 label" v-for="(item1,index) in item.tags"
									:key='index' :class="{'bg-eee':index==shoptags[parentIndex].showFlag}"
									@click="click(index,parentIndex,item,item1)">
									{{item1.name}}
								</view>
							</view>
						</view>
						<view class="flex flex-b mr-top20 mr-r20">
							<view class="">
								数量
							</view>
							<u-number-box v-model="value" @change="valChange" :min='1'></u-number-box>
						</view>
						<view class="bg-red cw f14 flex flex-c ai-c btn" @click="confirm()">
							确定
						</view>
					</scroll-view>
				</u-popup>
			</view>
			<view class="hd flex flex-b ai-c mr-tb10">
				<view class="flex ai-c">
					<view class="tag1">
						送至
					</view>
					<view class=" color-999 mr-l20">河南省 郑州市</view>
					<view class="co-red mr-l20">有货</view>
				</view>
				<u-icon name="arrow-right" size='30' color="#999999" class='right'></u-icon>
			</view>
			<view class="hd flex flex-b ai-c mr-tb10" @click="serve">
				<view class="flex ai-c lue1" style="width: 90%;">
					<view class="tag1">
						服务
					</view>
					<view class="cont flex">
						<view class="mr-l20 flex ai-c " v-for="(item,index) in serveList" :key='index'>
							<image src="../../static/icon/checkbox_check_hollowred.png" mode="" class="check"></image>
							<view class="lue1" style="width: 100rpx;">
								{{item}}
							</view>
						</view>
					</view>
				</view>
				<u-popup v-model="show1" :closeable='true' mode="bottom" height="70%" border-radius="14">
					<scroll-view scroll-y="true" style="height: 850rpx;">
						<view class="pd-20">
							<view class="flex flex-c f14 color-333">
								说明
							</view>
							<view class="mr-top20 flex" v-for="(item,index) in serviceInfo.serviceList" :key='index'>
								<view class="flex">
									<image src="../../static/icon/checkbox_check_hollowred.png" mode="" class="check">
									</image>
								</view>
								<view class="">
									<view class="color-333">
										{{item.name}}
									</view>
									<view class="color-a0a0 mr-tb10" :class="{'color-zong':item.descList[0]==='查看商家资质'}"
										@click="look(item.descList[0])" v-if="item.descList">
										{{item.descList[0]}}
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</u-popup>
				<u-icon name="arrow-right" size='30' color="#999999" class='right'></u-icon>
			</view>
		</view>
		<!-- 购买成功 -->
		<u-toast ref="uToast" />
		<view class="mask flex ai-c flex-c" v-if="show2" @click="look1">
			<image :src="serviceInfo.qualificationPic[0]" mode=""></image>
		</view>
		<!-- 加入购物车 -->
		<view class="bottom flex ai-c pd-20 bg-fff flex-b color-333" v-if="!show">
			<view class="flex col ai-c" @click="go('/pages/home/home')">
				<u-icon name="home" size='30'></u-icon>
				首页
			</view>
			<view class="flex col ai-c">
				<u-icon name="chat" size='30'></u-icon>
				客服
			</view>
			<view class="flex col ai-c pr" @click="go('/pages/shopcar/shopcar')">
				<u-icon name="shopping-cart" size='30'></u-icon>
				购物车
				<u-badge type="error" :count="count" :offset='offset' v-if='count'></u-badge>
			</view>
			<view class="flex buy overflow">
				<view class="box1 flex ai-c flex-c cw flex-1" @click="select1(2)">
					加入购物车
				</view>
				<view class="box2 flex ai-c flex-c cw flex-1" @click="select1(3)">
					立即购买
				</view>
			</view>
		</view>
		<u-toast ref="uToast" />
	</view>

</template>

<script>
	export default {
		components: {},
		props: {
			goods: {
				type: Object,
				required: true
			},
			serviceInfo: {
				type: Object,
				required: true
			}
		},
		data() {
			return {
				// 选中规格
				list: [],
				text: '',
				// 已选商品信息
				serveList: [],
				// 切换选择商品
				show: false,
				shoptags: [],
				value: 1,
				// 服务
				show1: false,
				// 查看资质
				show2: false,
				// 点击立即购买
				num: null,
				// 徽标
				offset: [-10, -10],
				count: 0
			}
		},
		methods: {
			// 选择商品,加入购物车
			select1(n) {
				this.show = !this.show
				this.num = n
			},
			// 数量
			valChange(e) {
				this.value = e.value
			},
			// 点击确定
			confirm() {
				this.show = false
				this.$set(this.goods.goodsInfo, 'norm', this.list)
				// 加入购物车确定
				let a = uni.getStorageSync('user')
				// 判断用户登没登录
				if (a) {
					if (this.list.length === this.shoptags.length) {
						if (this.num === 2) {
							this.$refs.uToast.show({
								title: '已加入购物车',
								type: 'success',
							})
							this.save('carts')
							this.getCount()
						} else if (this.num === 3) {
							let sum = (this.goods.goodsInfo.priceMin / 100) * this.value
							this.$refs.uToast.show({
								title: `购买成功,共${sum}元`,
								type: 'success',
							})
							let array = []
							this.$set(this.goods.goodsInfo, 'count', this.value)
							array.unshift(this.goods.goodsInfo)
							let obj = {
								time: new Date(),
								data: array,
								sum: sum
							}
							let n = uni.getStorageSync('orderList')
							if (n) {
								n.unshift(obj)
								uni.setStorageSync('orderList', n)
							} else {
								let arr = []
								arr.unshift(obj)
								uni.setStorageSync('orderList', arr)
							}
						}
					} else {
						this.showToast()
						this.show = true
					}
				} else {
					uni.showModal({
						content: '请先登录',
						success: () => {
							wx.getUserProfile({
								desc: '登陆成功后可进行更多操作',
								success: (res) => {
									uni.setStorageSync('user', res.userInfo)
								}
							})
						}
					})
				}
			},
			// 选择规格
			click(index, parentIndex, item, item1) {
				// 添加背景颜色
				this.shoptags[parentIndex].showFlag = index
				item.spec.name = item.name
				item.spec.value = item1.name
				// 得到规格数据
				this.list[parentIndex] = item1.name
			},
			// 点击服务
			serve() {
				this.show1 = true
			},
			// 弹框提醒
			showToast() {
				this.$refs.uToast.show({
					title: '请先选择规格'
				})
			},
			// 查看商家资质
			look(item) {
				if (item === '查看商家资质') {
					this.show2 = !this.show2
				}
			},
			look1() {
				this.show2 = !this.show2
			},
			// 点击首页和购物车
			go(url) {
				uni.switchTab({
					url: url
				})
			},
			// 获取徽标
			getCount() {
				// 得到count
				let n = this.$utils.getHistory({
					key: 'carts'
				})
				if (n) {
					this.count = n.length
				}
			},
			// 存数据
			save(name) {
				let n1 = uni.getStorageSync('cartsHistory')
				this.$set(this.goods.goodsInfo, 'norm', this.list)
				this.$set(this.goods.goodsInfo, 'count', this.value)
				if (n1) {
					// 判断gid是否相同
					let n2 = n1.filter(item => {
						return item.gid === this.goods.goodsInfo.gid
					})
					console.log(n2)
					// 如果gid相同，判断规格是否相同
					let obj = n2.find(i => {
						return i.norm.toString() === this.goods.goodsInfo.norm.toString()
					})
					if (obj) {
						// 如果规格相同
						obj.count = obj.count + this.value
						n1 = n1.filter(item2 => {
							return item2.norm.toString() !== obj.norm.toString()
						})
						console.log(n1)
						n1.unshift(obj)
						// console.log(11)
					} else { // gid不相同
						n1.unshift(this.goods.goodsInfo)
					}
					uni.setStorageSync(`${name}History`, n1)
				} else {
					console.log('第一次存')
					let arr = []
					arr.unshift(this.goods.goodsInfo)
					uni.setStorageSync(`${name}History`, arr)
				}
			},
		},
		mounted() {
			Object.values(this.goods.services).map(item => {
				this.serveList.push(item.text)
			})
			this.shoptags = this.goods.shopTags
			// console.log(Object.values(this.goods.services))
			if (this.serveList.length > 3) {
				this.serveList = this.serveList.slice(0, 3)
			}
			this.shoptags.map(item => {
				let obj = {
					name: '',
					value: ''
				}
				this.$set(item, 'spec', obj)
				this.$set(item, 'showFlag', -1)
				// console.log(item)
			})
			this.getCount()
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
		height: 60rpx;
		position: relative;

		.right {
			position: absolute;
			right: 20rpx;
			top: 20rpx;
		}

		.tag1 {
			width: 60rpx;
		}

		.cont {
			/* #ifdef MP-WEIXIN */
			width: 65% !important;
			/* #endif */
			/* #ifdef H5 */
			width: 90% !important;
			/* #endif */
		}

		.img {
			height: 180rpx;
			width: 180rpx;
		}

		.label {
			padding: 10rpx;
		}

		.check {
			width: 30rpx;
			height: 30rpx;
			margin-right: 10rpx;
		}
	}

	.btn {
		height: 60rpx;
		width: 95%;
		border-radius: 30rpx;
		position: fixed;
		bottom: 10rpx;
		left: 0;
		right: 0;
		margin: 0 auto;
	}

	.mask {
		position: fixed;
		z-index: 9999;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background-color: rgba(0, 0, 0, .3);
	}

	//加入购物车
	.bottom {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 100rpx;
		z-index: 999999;

		.buy {
			height: 80rpx;
			border-radius: 40rpx;
			width: 400rpx;

			.box1 {
				background-color: #f6c84c;
			}

			.box2 {
				background-color: #dd3534;
			}
		}
	}
</style>
