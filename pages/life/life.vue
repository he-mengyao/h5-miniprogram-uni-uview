<template>
	<view class="life">
		<!-- 顶部 -->
		<view class="box">
			<tabbar :color="color">
				<template #middle>
					<view class="ta-c">
						<image src="../../static/life_title.png" mode="" class="life-img"></image>
					</view>
				</template>
			</tabbar>
			<!-- 导航 -->
			<view class="scroll_box">
				<scroll-view scroll-x="true">
					<view class="flex cw f14">
						<view v-for="(item,index) in list" :key='index' class="nav flex col ai-c"
							@click='change(index,item)'>
							<view class="">
								{{item.title}}
							</view>
							<view class="line boder-r10" v-if="index===current">
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
			<!-- 轮播图 -->
			<view class="wrap swiper mr-top20">
				<u-swiper :list="swiper" :effect3d="true" border-radius='10' effect3d-previous-margin='0'
					bg-color='transparent' @click='click'></u-swiper>
			</view>
		</view>
		<view class="subnav flex flex-a">
			<view class="subnav-item flex col ai-c" v-for="(item,index) in subnavList" :key='index'
				@click="go(item.link)">
				<image :src="item.picUrl" mode="" class="sub-img"></image>
				<view class="color-333">
					{{item.title}}
				</view>
			</view>
		</view>
		<!-- 瀑布图 -->
		<view class="" v-if="recom.length>0">
				<scroll-view scroll-y="true" @scrolltolower='scrolltolower' style="height: 100vh;">
			<u-waterfall v-model="recom" class='water'>
				<template v-slot:left="{leftList}">
					<view v-for="(item, index) in leftList" :key="index" class="boder-r10 overflow recom-item left" @click="detail1(item.contentId)">
						<image :src="item.pic" mode="" class="img2"></image>
						<view class="recom-title mr-top20">
							{{item.title}}
						</view>
						<view class="user flex flex-b color-a0a0 mr-top20">
							<view class="flex">
								<image :src="item.author.avatar" mode="" class="user-pic"></image>
								<view class="nickname">
									{{item.author.nickname}}
								</view>
							</view>
							<view class="">
								{{item.likeStatusInfo.likeNum}}阅读
							</view>
						</view>
					</view>
				</template>
				<template v-slot:right="{rightList}">
					<view v-for="(item, index) in rightList" :key="index" class="boder-r10 overflow recom-item right" @click="detail1(item.contentId)">
						<image :src="item.pic" mode="" class="img2"></image>
						<view class="recom-title mr-top20">
							{{item.title}}
						</view>
						<view class="user flex flex-b color-a0a0 mr-top20">
							<view class="flex">
								<image :src="item.author.avatar" mode="" class="user-pic"></image>
								<view class="nickname">
									{{item.author.nickname}}
								</view>
							</view>
							<view class="">
								{{item.likeStatusInfo.likeNum}}阅读
							</view>
						</view>
					</view>
				</template>
			</u-waterfall>
				</scroll-view>
		</view>
	</view>

</template>

<script>
	import tabbar from '../../components/tabbar/tabbar.vue'
	export default {
		components: {
			tabbar
		},
		props: {},
		data() {
			return {
				color: '#efa221',
				list: [],
				current: 0,
				swiper: [],
				subnavList: [],
				recom: [],
				page: '1',
				pageSize: '10',
				tab: '',
				// 轮播图总数据
				swiperList:[]
			}
		},
		methods: {
			change(index, item) {
				this.current = index;
				this.tab =item.id
				this.recom=[]
				this.getHomeTab(item.id,this.page,this.pageSize)
			},
			// 获取数据
			getbktrSimple() {
				this.$api.bktrSimple().then(res => {
					res = this.$utils.trriger(res)
					// 导航
					this.list = res.data.tab
					// 轮播图
					res.data.banner.map(item => {
						let obj = {
							image: item.picUrl
						}
						this.swiper.push(obj)
					})
					this.swiperList=res.data.banner
					// 数码圈子
					this.subnavList = res.data.kkong
					// console.log(res.data)
				}).catch(err => {
					console.log('生活数据请求失败', err)
				})
			},
			// 数码圈子跳转
			go(url) {
				this.$utils.go(url)
			},
			// 获取推荐文章
			getSimilarFeed() {
				this.$api.getSimilarFeed().then(res => {
					res = this.$utils.trriger(res)
					this.recom = res.data
					// console.log(this.recom)
				}).catch(err => {
					console.log('获取推荐文章失败', err)
				})
			},
			// 生活板块
			getHomeTab(tab, page, pageSize) {
				this.$api.getHomeTab(tab, page, pageSize).then(res => {
					res=this.$utils.trriger(res)
					this.recom=this.recom.concat(res.data)
					// console.log(this.recom)
				}).catch(err => {
					console.log('生活模块请求失败')
				})
			},
			// 下拉刷新
			scrolltolower(){
				this.page++
				this.getHomeTab(this.list[this.current].id,this.page,this.pageSize)
			},
			// 点击轮播图
			click(index){
				// console.log(this.swiperList[index])
				this.$utils.go(this.swiperList[index].link)	
			},
			// 查看详情
			detail1(id){
				uni.navigateTo({
					url:`/pages/detail/detail?id=${id}`
				})
			}
		},
		mounted() {
			this.getbktrSimple()
			this.getSimilarFeed()
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
	.life-img {
		width: 100rpx;
		height: 40rpx;
	}

	.box {
		background-color: #efa221;
		height: 280rpx;
	}

	.scroll_box {
		/* #ifdef H5 */
		margin-top: 95rpx;
		/* #endif */
		/* #ifdef MP-WEIXIN */
		margin-top: 145rpx;

		/* #endif */
		.nav {
			padding: 0 50rpx;
			/* #ifdef MP-WEIXIN */
			padding: 0 40rpx;

			/* #endif */
			.line {
				height: 10rpx;
				width: 50rpx;
				background-color: #FFFFFF;
			}
		}
	}

	.swiper {
		padding-left: 30rpx;
	}

	.subnav {
		margin-top: 60rpx;
	}

	.sub-img {
		height: 80rpx;
		width: 80rpx;
	}

	.left {
		margin-top: 20rpx;
		margin-left: 20rpx;
	}

	.right {
		&:first-child {
			margin-top: 20rpx;
		}

		margin: 30rpx 20rpx;
	}

	.recom-item {
		border-radius: 10rpx;

		.img2 {
			width: 100%;
			height: 300rpx;
		}

		.user-pic {
			width: 40rpx;
			height: 40rpx;
			border-radius: 100%;
		}

		.nickname {
			margin-left: 20rpx;
		}
	}
</style>
