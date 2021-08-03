<template>
	<view class="bd">
		<view class="back" @click="back">
			<u-icon name="arrow-left"></u-icon>
		</view>
		<image :src="data.pic" mode="" class="pic"></image>
		<view class="body bg-fff">
			<view class="item flex flex-b ai-c">
				<view class="left flex ai-c" v-if="data.author">
					<image :src="data.author.avatar" mode="" class="user-pic br"></image>
					<view class="">
						{{data.author.nickname}}
					</view>
				</view>
				<view class="right cw flex ai-c flex-c fw">
					+ 关注
				</view>
			</view>
			<view class="f16 fw mr-top20 ellipsis">
				{{data.title}}
			</view>
			<view class="color-999 content" v-html="content">
			</view>
			<view class="product flex border boder-r10 pr">
				<image :src="goods.img800s" mode="" class="pro-pic"></image>
				<view class="flex col flex-b fw">
					<view class="ellipsis">
						{{goods.name}}
					</view>
					<view class="">
						￥{{goods.priceMin/100}}
					</view>
				</view>
				<view class="buy1 cw flex ai-c flex-c bg-red pa">
					立即购买
				</view>
			</view>
			<!-- 标签 -->
			<view class="tag flex wrap">
				<view class="label" v-for="(item,index) in goods.labels" :key='index'>
					# {{item.text}}
				</view>
			</view>
		</view>
		<view class="comment mr-top20 bg-fff">
			<view class="com-title flex flex-b ai-c">
				<view class="fw">
					全部评论
				</view>
				<view class="" :style="{'color':'#826e58'}" @click="write">
					<u-icon name="edit-pen" color="#826e58" size="28"></u-icon>写评论
				</view>
			</view>
			<u-empty text="沙发还空着,快来抢吧" mode="list" @click="write"></u-empty>
			<u-popup v-model="show" mode="bottom" border-radius="14" height='90%'>
				<view class='pr'>
					<view class="top flex flex-c pr ai-c fw f14">
						全部评论<image src="../../static/del.png" mode="" class="del" @click="close"></image>
					</view>
					<view class="comment-items">
						<view class="" v-if="comment.length==0">
							<u-empty text="沙发还空着,快来抢吧" mode="list" class='empty'></u-empty>
						</view>
						<view class="com" v-if="comment.length>0">
							<view class="avtor flex pr border-b" v-for="(item,index) in comment" :key='index'>
								<image src="../../static/avatar_default.png" mode="" class="avtor-pic"></image>
								<view class="flex flex-b col">
									<view class="fw">
										未登录用户
									</view>
									<view class="">
										{{item}}
									</view>
								</view>
								<view class="flex ai-c zan" @click="zan">
									<image src="../../static/icon/feed_pinwei_not_fav.png" mode="" class="icon" v-if="flag"></image>
									<image src="../../static/icon/feed_pinwei_fav.png" mode="" class="icon" v-if="!flag"></image>
									<view class="">
										{{flag?'赞':'已赞'}}
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="bottom flex flex-b ai-c">
						<input type="text" placeholder="发表你的评论" class="boder-r10" v-model="value" />
						<view class="send color-zong" @click="send">
							发送
						</view>
					</view>
					<u-toast ref="uToast" />
				</view>
			</u-popup>
		</view>
		<view class="footer flex flex-a ai-c">
			<image src="../../static/icon/feed_pinwei_not_fav.png" mode="" class='icon' @click="zan1" v-if="flag1"></image>
			<image src="../../static/icon/feed_pinwei_fav.png" mode="" class="icon" @click="zan1" v-if="!flag1"></image>
			<image src="../../static/icon/feed_pinwei_comment.png" mode="" class='icon' @click="write"></image>
			<image src="../../static/icon/feed_pinwei_share.png" mode="" class="icon"></image>
			<view class="buy cw fw flex flex-c ai-c">
				<image src="../../static/goods-count.png" mode="" class="gou"></image>立即购买
			</view>
		</view>
	</view>

</template>

<script>
	import tabbar1 from '../../components/tabbar1/tabbar1.vue'
	export default {
		components: {
			tabbar1
		},
		props: {},
		data() {
			return {
				data: {},
				content: '',
				goods: {},
				// 弹出层
				show: false,
				comment: [],
				value: '',
				// 评论点赞
				flag:true,
				// 详情点赞
				flag1:true
			}
		},
		methods: {
			// 获取详情
			detail(id) {
				this.$api.detail1(id).then(res => {
					res = this.$utils.trriger(res)
					this.data = res.data
					// console.log(res.data)
					this.goods = this.data.goodsInfo[0]
					// console.log(this.goods)
					let text = this.$utils.trriger(this.data.resource)
					/* #ifdef MP-WEIXIN */
					this.content = text
					/* #endif */
					/* #ifdef H5 */
					text.blocks.map(item => {
						this.content += item.text + '\n'
					})
					/* #endif */
				}).catch(err => {
					console.log('文章详情获取失败', err)
				})
			},
			// 写评论
			write() {
				this.show = true
			},
			// 点击发送
			send() {
				// console.log(this.value)
				this.comment.push(this.value)
				this.value = ''
				this.$refs.uToast.show({
					title: '提交评论成功',
					type: 'success',
					url: '/pages/user/index'
				})
			},
			// 关闭评论
			close() {
				this.show = false
			},
			// 点赞
			zan(){
				this.flag=!this.flag
			},
			// 详情点赞
			zan1(){
				this.flag1=!this.flag1
			},
			// 返回
			back(){
				uni.switchTab({
					url:"/pages/life/life",
				})
			}
		},
		mounted() {},
		onLoad(options) {
			this.detail(options.id)
		},
		onShow() {

		},
		filters: {},
		computed: {},
		watch: {},
	}
</script>

<style scoped lang="scss">
	.bd {
		background-color: #eee;

		.back {
			position: fixed;
			top: 20rpx;
			left: 20rpx;
			/* #ifdef MP-WEIXIN */
			top: 70rpx;
			/* #endif */
			height: 60rpx;
			width: 60rpx;
			background-color: rgba(0, 0, 0, .15);
			border-radius: 100%;
			text-align: center;
			line-height: 60rpx;
			z-index: 1;
		}

		.pic {
			width: 100%;
			height: 600rpx;
		}

		.body {
			padding: 20rpx;

			.item {
				.user-pic {
					height: 80rpx;
					width: 80rpx;
					margin-right: 20rpx;
				}

				.right {
					height: 50rpx;
					width: 130rpx;
					background: linear-gradient(to right, #f5ba51, #f1a054);
					border-radius: 25rpx;
				}
			}

			.content {
				margin-top: 20rpx;
				line-height: 2;
			}

			.product {
				border: 1px solid #eee;
				margin: 20rpx 0;
				padding: 20rpx;

				.pro-pic {
					width: 120rpx;
					height: 120rpx;
					margin-right: 20rpx;
				}

				.buy1 {
					bottom: 20rpx;
					right: 20rpx;
					height: 50rpx;
					width: 150rpx;
					border-radius: 25rpx;
					background-color: red;
				}
			}

			.label {
				padding: 10rpx 20rpx;
				background-color: #fcf7d7;
				margin-right: 20rpx;
				color: #9e845b;
			}
		}

		.comment {
			padding: 20rpx;
			padding-bottom: 100rpx;
		}

		.top {
			height: 60rpx;
			border-bottom: 1px solid #eee;

			.del {
				height: 30rpx;
				width: 30rpx;
				position: absolute;
				right: 40rpx;
				top: 15rpx;
			}
		}

		.empty {
			margin-top: 50rpx !important;
		}

		.bottom {
			height: 80rpx;
			padding: 0 30rpx;
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;

			input {
				padding-left: 20rpx;
				background-color: #eee;
				width: 88%;
				height: 60rpx;
			}
		}

		.avtor {
			padding: 20rpx;

			// 评论头像
			.avtor-pic {
				height: 80rpx;
				width: 80rpx;
				border-radius: 100%;
				margin-right: 40rpx;
			}

			.zan {
				position: absolute;
				top: 30rpx;
				right: 40rpx;
			}
		}
	}

	.footer {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 100rpx;
		background-color: #FFFFFF;

		.buy {
			height: 60rpx;
			width: 200rpx;
			background: linear-gradient(to right, #e87c40, #d7602b);
			border-radius: 40rpx;
		}
	}
	// 立即购买
	.gou {
		width: 30rpx;
		height: 30rpx;
		margin-right: 20rpx;
	}
</style>
