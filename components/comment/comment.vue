<template>
	<view class="comment mr-top20 pd-20" v-if="comment.index">
		<view class="hd flex flex-b">
			<view class="fw">
				用户评价({{comment.index.total_count}})
			</view>
			<view class="color-a0a0 arrow" @click="gocomment">
				{{comment.index.positive_rate}}%满意 >
			</view>
		</view>
		<view class="flex wrap">
			<view class="tag mr-r20 mr-top20 flex flex-c ai-c" v-for="(item,index) in tags" :key='index'>
				{{item.name}}({{item.count}})
			</view>
		</view>
		<view class="bd flex mr-top20" style="height: 200rpx;" v-if="comment.content.length>0">
			<scroll-view scroll-x="true">
				<view class="flex">
					<view class="pd-20 item boder-r10" v-for="(item,index) in comment.content" :key='index'>
						<view class="title flex ai-c">
							<view class="mr-r20">
								<image :src="item.avatar" mode="" class="user" v-if="item.avatar"></image>
								<image src="../../static/avatar_default.png" mode="" class="user" v-if="!item.avatar">
								</image>
							</view>
							<view class="color-333 mr-r20 name">
								{{item.nick_name}}
							</view>
							<u-rate :count="item.score" v-model="score" :disabled='true' active-color='#eec06d'>
							</u-rate>
						</view>
						<view class="body flex wrap color-a0a0 ellipsis">
							{{item.text}}
						</view>
					</view>
					<view class="look color-a0a0" @click="gocomment">
						查看更多评价
					</view>
				</view>
			</scroll-view>
		</view>
	</view>

</template>

<script>
	export default {
		components: {},
		props: {
			comment: {
				type: Object,
				required: true
			},
			ids: {
				type: String,
				required: true
			}
		},
		data() {
			return {
				tags: [],
				score: 5
			}
		},
		methods: {
			// 进评价详情
			gocomment() {
				uni.navigateTo({
					url: `/pages/commentDeatil/commentDetail?gid=${this.ids}`
				})
			},
		},
		mounted() {
			if (this.comment.index) {
				this.tags = this.comment.index.tags
			}
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
	.comment {
		background-color: #FFFFFF;

		.tag {
			background-color: #f2e9d0;
			padding: 10rpx;
			height: 40rpx;
			border-radius: 30rpx;
		}
	}

	.user {
		height: 60rpx;
		width: 60rpx;
		border-radius: 100%;
	}

	.item {
		height: 200rpx;
		background-color: #fbfafd;
		margin-right: 20rpx;

		.name {
			width: 120rpx;
		}

		.title {
			height: 100rpx;
		}

		.body {
			width: 100%;
		}
	}

	.look {
		width: 50rpx;
	}
</style>
