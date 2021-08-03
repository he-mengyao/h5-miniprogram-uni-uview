<template>
	<view class="bg-purple">
		<u-navbar back-text=" " title="我的订单"></u-navbar>
		<view class="nav flex ai-c f14 color-333 pd-20 bg-fff">
			<view class="flex ai-c flex-c nav-item flex-1" v-for="(item,index) in list " :key='index'
				:class="{'item':index==current}" @click="change(index)">
				{{item.name}}
			</view>
		</view>
		<view class="bd">
			<view class="content">
				<view class="pd-20" v-if="list1.length>0">
					<view class=" bg-fff mr-top20 boder-r10" v-for="(item,index) in list1" :key='index'>
						<view class="flex flex-b ai-c color-333 f14 pd-20">
							<view class="">
								订单时间：{{item.time}}
							</view>
							<view class="co-red">
								已完成订单
							</view>
						</view>
						<view class="">
							<view class="flex ai-c pd-20" v-for="(item1,index1) in item.data" 
							:key='index1' @click="detail(item1)">
								<image :src="item1.picUrl" mode="" class="img-180"></image>
								<view class="" style="width: 70%;">
									<view class="lue1">
										{{item1.name}}
									</view>
									<view class="color-a0a0 lue1 flex">
										<view class="" v-for="(item2,index2) in item1.norm" :key='index2'>
											{{item2}}
										</view>
									</view>
									<br>
									<view class="flex flex-b ai-c">
										<view class="co-red fw">
											￥{{item1.priceMin/100}}
										</view>
										<view class="color-a0a0">
											× {{item1.count}}
										</view>
									</view>
								</view>
							</view>
						</view>
						<view class="fw f14 co-red pd-20" style="text-align: right;">
							总计 : {{item.sum.toFixed(2)}}
						</view>
					</view>
				</view>
				<view class="empty flex col ai-c mr-top20" v-else>
					<u-empty text="目前没有订单哦~" mode="list"></u-empty>
				</view>
			</view>
			<weiniRecom></weiniRecom>
		</view>
	</view>

</template>

<script>
	import weiniRecom from '../../components/weiniRecom/weiniRecom.vue'
	import dayjs from 'dayjs'
	export default {
		components: {
			weiniRecom
		},
		props: {},
		data() {
			return {
				list1: [],
				list: [{
					name: '全部'
				}, {
					name: '待付款'
				}, {
					name: '待收货',
				}, {
					name: '已收货'
				}, {
					name: '退款'
				}],
				current: 0,
			}
		},
		methods: {
			// 点击标签
			change(index) {
				this.current = index
			},
			// 点击商品
			detail(item){
				uni.navigateTo({
					url:`/pages/productDetail/productDetail?id=${item.gid}`
				})
			}
		},
		mounted() {

		},
		onLoad(options) {
			this.current = options.index
		},
		onShow() {
			let arr = uni.getStorageSync('orderList')
			if (arr) {
				this.list1 = arr
				this.list1.map(item=>{
					item.time=dayjs(item.time).format('YYYY-MM-DD HH:mm:ss')
				})
			}

		},
		filters: {},
		computed: {},
		watch: {},
	}
</script>

<style scoped lang="scss">
	.nav {
		height: 80rpx;

		.nav-item {
			height: 50rpx;
			border-radius: 25rpx;
			margin-right: 20rpx;
		}

		.item {
			background-color: #dab768;
			color: #FFFFFF;
		}
	}
</style>
