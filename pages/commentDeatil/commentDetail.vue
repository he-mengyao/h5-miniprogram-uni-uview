<template>
	<view class="bg-purple html">
		<u-navbar title="全部评价"></u-navbar>
		<view class="hd pd-20">
			<view class="flex flex-b rate">
				<view class="">
					综合评分：<u-rate disabled :count="data.avg_score" v-model="value" active-color='#eec369'></u-rate>
				</view>
				<view class="color-a0a0">
					{{data.positive_rate}}%满意
				</view>
			</view>
			<view class="flex wrap" v-if="flag">
				<view class="tag flex flex-c ai-c color-zong" v-for="(item,index) in tags1" :key='index'
					:class="{'quan':index===current}" @click="select(item.id,index)">
					{{item.name}}({{item.count}})
				</view>
			</view>
			<view class="flex wrap" v-if="!flag">
				<view class="tag flex flex-c ai-c color-zong" v-for="(item,index) in tags" :key='index'
					:class="{'quan':index===current}" @click="select(item.id,index)">
					{{item.name}}({{item.count}})
				</view>
			</view>
			<view class="ta-c mr-top20">
				<u-icon name="arrow-down" color="#999999" size="28" @click='load'></u-icon>
			</view>
		</view>
		<view class="bd boder-r10">
			<scroll-view scroll-y="true" @scrolltolower="scrolltolower" style="height: 100vh;">
				<view class="flex items boder-r10 bg-fff" v-for="(item,index) in list" :key='index'>
					<view class="mr-r20">
						<image :src="item.avatar" mode="" class="avtor" v-if="item.avatar"></image>
						<image src="../../static/avatar_default.png" mode="" class="avtor" v-if="!item.avatar"></image>
					</view>
					<view class="color-a0a0" style="width: 100%;">
						<view class="user flex flex-b ai-c ">
							<view class="color-333">
								{{item.nick_name}}
								<u-rate disabled :count="data.score" v-model="value" active-color='#eec369'></u-rate>
							</view>
							<view class="">
								{{item.ctime}}
							</view>
						</view>
						<view class="">
							已选：{{item.pid_spec}}
						</view>
						<view class="color-333 mr-top20" style="width: 80%;">
							{{item.text}}
						</view>
						<view class="flex" v-if="item.comment_imgs.length>0">
							<view class="flex wrap" v-for="(item1,index1) in item.comment_imgs" :key='index1'>
								<image :src="item1.img" mode="" class="pro-pic boder-r10"></image>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>

</template>

<script>
	import dayjs from 'dayjs'
	export default {
		components: {},
		props: {},
		data() {
			return {
				id: '',
				value: 5,
				data: {},
				tags1: [],
				// 未截取的标签
				tags: [],
				flag: true,
				page: 1,
				pageSize: 10,
				tagId: '',
				list: [],
				tagId: '',
				current: 0
			}
		},
		methods: {
			commentTag(id) {
				this.$api.commentTag(id).then(res => {
					res = this.$utils.trriger(res)
					this.data = res.data
					if (res.data.tags) {
						this.tags = res.data.tags
						if (res.data.tags.length > 3) {
							this.tags1 = res.data.tags.slice(0, 3)
						}else {
							this.tags1=this.data.tags
						}
						this.tagId = this.tags[0].id
						this.commentContent(this.id, this.page, this.pageSize, this.tagId)
					}
					console.log(this.tags1)
				}).catch(err => {
					console.log('更多评价获取失败', err)
				})
			},
			// 查看更多标签
			load() {
				this.flag = !this.flag
			},
			// 点击标签
			select(id, index) {
				this.current = index
				this.tagId = id
				this.list = []
				this.commentContent(this.id, this.page, this.pageSize, this.tagId)
			},
			// 获取评价列表
			commentContent(gid, page, pageSize, tagId) {
				this.$api.commentContent(gid, page, pageSize, tagId).then(res => {
					res = this.$utils.trriger(res)
					this.list = this.list.concat(res.data.list)
					this.list.map(item => {
						item.ctime = dayjs(item.ctime).format('YYYY.MM.ss')
					})
					// console.log(this.list)
				}).catch(err => {
					console.log('评价列表请求失败')
				})
			},
			// 下拉刷新
			scrolltolower() {
				this.page++
				this.commentContent(this.id, this.page, this.pageSize, this.tagId)
			}
		},
		mounted() {},
		onLoad(options) {
			this.id = options.gid
			this.commentTag(this.id)
			// console.log(this.id)
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
		.rate {
			height: 40rpx;
		}

		.tag {
			padding: 10rpx;
			height: 40rpx;
			background-color: #f1e8d6;
			border-radius: 20rpx;
			margin: 20rpx 20rpx 0 0;
		}

		.quan {
			background-color: #deba72 !important;
			color: #FFFFFF;
		}

	}

	.bd {
		margin: 0 20rpx;

		.items {
			margin-bottom: 20rpx;
			padding: 20rpx;
		}

		.user {
			height: 50rpx;
			width: 95%;
		}

		.pro-pic {
			width: 180rpx;
			height: 180rpx;
			margin: 20rpx 20rpx 0 0;
		}
	}
</style>
