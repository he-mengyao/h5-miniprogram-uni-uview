<template>
	<view class="mr-top20">
		<view class="hd flex bg-fff">
			<view class="flex-1 flex ai-c flex-c col color-a0a0" v-for="(item,index) in list" :key='index'
				@click="click(item,index)">
				<view class="item" :class="{'color-brown':index===current}">
					{{item}}
				</view>
				<view class="mr-top20 line" :class="{'bg-zong':index===current}">
				</view>
			</view>
		</view>
		<view class="content mr-top20 bg-fff" v-if="current===0">
			<view class="box" v-for="(item,index) in goods.goodsInfo.introExt[0].imagesArray" :key='index'>
				<image :src="item" mode="" class="w-100"></image>
			</view>
		</view>
		<view class="content mr-top20 bg-fff" v-if="current===1">
			<view class="box" v-for="(item,index) in goods.goodsInfo.introExt[1].imagesArray" :key='index'>
				<image :src="item" mode="" class="w-100"></image>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		components: {},
		props: {
			goods: {
				type: Object,
				required: true
			}
		},
		data() {
			return {
				list: ['产品详情', '常见问题'],
				current: 0,
			}
		},
		methods: {
			click(item, index) {
				this.current = index
			},
		},
		mounted() {
			// console.log(this.goods)
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

		.item {
			height: 20rpx;
		}

		.line {
			height: 5rpx;
			width: 40rpx;
			background-color: transparent;
		}

		.bg-zong {
			background-color: #826e58;
		}
	}
	.box {
		line-height: 0;
	}

</style>
