<template>
	<view>
		<u-navbar back-text=" " :title="title"></u-navbar>
		<view class="item flex  mr-l20 mr-r20 mr-top20 pd-20 pr" v-for="(item,index) in list" :key='index'
			@click="detail(item.gid)">
			<view class="left flex flex-c ai-c">
				<image :src="item.picUrl" mode="" class="img"></image>
			</view>
			<view class="flex flex-b col right">
				<view class="">
					<view class="">
						{{item.name}}
					</view>
					<view class="color-a0a0">
						{{item.summary}}
					</view>
				</view>
				<view class="co-red fw f14">
					￥{{item.priceMin/100}}
				</view>
			</view>
			<view class="" @click.stop='close(item)'>
				<u-icon name="close-circle" color="#999999" class='pa close' size='40'>
				</u-icon>
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
				title: "",
				list: [],
				show: false,
				item: {},
				name: ''
			}
		},
		methods: {
			getData(name) {
				let a = null
				a = this.$utils.getHistory({
					key: name
				})
				// console.log(a)
				if (a) {
					this.list = a
				}
			},
			// 点击详情
			detail(gid) {
				uni.navigateTo({
					url: `/pages/productDetail/productDetail?id=${gid}`
				})
			},
			// 点击删除
			close(item) {
				// this.show = true;
				this.item = item
				uni.showModal({
					title:'提示',
					content:'您确定删除这件商品吗？',
					success: () => {
						this.$utils.saveCollect({
							key: this.name,
							data: this.item,
							attr: 'gid'
						})
						this.getData(this.name)
						this.show = false
					}
				})
			},
		},
		mounted() {},
		onLoad(options) {
			this.title = options.title
			// console.log(options)
			if (this.title === '浏览记录') {
				this.name = 'browse'
			} else {
				this.name = 'collect'
			}
		},
		onShow() {
			this.getData(this.name)
		},
		filters: {},
		computed: {},
		watch: {},
	}
</script>

<style scoped lang="scss">
	.item {
		.img {
			height: 180rpx;
			width: 180rpx;
		}

		.close {
			bottom: 20rpx;
			right: 40rpx;
		}
	}
</style>
