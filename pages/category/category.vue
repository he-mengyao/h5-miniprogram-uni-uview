<template>
	<view class="categ">
		<!-- 标题 -->
		<u-navbar :is-back='false' title="分类"></u-navbar>
		<!-- 搜索框 -->
		<view class="flex flex-c nav pd-20">
			<!-- #ifdef MP-WEIXIN -->
			<u-search :placeholder="text" v-model="value" :show-action="false" style='width: 100vw;'></u-search>
			<!-- #endif -->
			<!-- #ifdef H5 -->
			<u-search :placeholder="text" v-model="value" :show-action="true" @search='search' @custom='custom'>
			</u-search>
			<!-- #endif -->
		</view>
		<!-- 分类 -->
		<view class="pr bd flex">
			<view class="left bg-fff">
				<view class="scroll_box">
					<scroll-view scroll-y="true" style="height: 80vh;">
						<view class="nav-item color-999 flex flex-c ai-c f14" :class="{'bg-red':index===current}"
							v-for="(item,index) in categList" :key='index' @click="trigger(item,index)">{{item.name}}
						</view>
					</scroll-view>
				</view>
			</view>
			<view class="right flex ai-c col flex-c">
				<view class="scroll_box">
					<scroll-view scroll-y="true" style="height: 80vh;" @scrolltolower="scrolltolower">
						<image :src="data.banner" mode="" class="banner boder-r10" @click="go(data.bannerUrl)"></image>
						<view class="children mr-top20 bg-fff boder-r10" v-for="(item,index) in data.children"
							:key='index'>
							<view class="bd-title f14">
								{{item.name}}
							</view>
							<view class="bd-item flex wrap">
								<view class="items flex col ai-c mr-top20" v-for="(item1,index1) in (item.children)"
									:key='index1' @click="search(item1)">
									<image :src="item1.smallImgCard.img" mode="" class="img-100"></image>
									<view class="color-999 f12">
										{{item1.smallImgCard.name}}
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
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
				color:'#fff',
				text: '',
				value: '',
				categList: [],
				current: 0,
				// 二级分类数据
				data: {},
			}
		},
		methods: {
			// 获取占位词
			placeHolder() {
				this.$api.placeHolder().then(res => {
					res = this.$utils.trriger(res)
					res.data.map(item => {
						let num = Math.floor(Math.random() * res.data.length)
						this.text = res.data[num].queryName
					})
					// console.log(this.placeHolderText)
				}).catch(err => {
					console.log('站为此请求失败', err)
				})
			},
			// 获取一级分类
			list() {
				this.$api.list().then(res => {
					res = this.$utils.trriger(res)
					this.categList = res.data
					this.detail(this.categList[0].id)
				}).catch(err => {
					console.log('获取一级分类失败', err)
				})
			},
			// 获取二级分类
			detail(id) {
				this.$api.detail(id).then(res => {
					res = this.$utils.trriger(res)
					this.data = res.data
					// console.log(this.data)
				}).catch(err => {
					console.log('二级分类请求失败', err)
				})
			},
			// 切换导航栏
			trigger(item, index) {
				this.current = index
				// console.log(item)
				this.detail(item.id)
			},
			// 点击banner
			go(url){
				this.$utils.go(url)
			},
			// 点击商品类别
			search(item){
				uni.navigateTo({
					url:`/pages/searchList/searchList?value=${item.smallImgCard.name}`
				})
			},
			// 下拉到底
			scrolltolower(){
				this.current++
			}
		},
		mounted() {
			this.placeHolder()
			this.list()
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
	.categ {
		.bd {
			margin-top: 10rpx;
			.left {
				width: 25%;

				.nav-item {
					margin: 30rpx 20rpx;
					height: 50rpx;
					border-radius: 30rpx;
				}

				.bg-red {
					background: linear-gradient(to right, #e0563c, #c62f25);
					color: #FFFFFF;
				}
			}

			.right {
				/* #ifdef H5 */
				padding: 0 20rpx;
				width: 75%;
				/* #endif */
				background-color: #fbf9fb;
				/* #ifdef MP-WEIXIN */
				width: 70%;
				padding: 0 20rpx;

				/* #endif */
				.banner {
					height: 150rpx;
					width: 100%;
				}

				.children {
					padding: 10rpx;

					.bd-title {
						margin-left: 20rpx;
					}
				}
			}
		}
	}
</style>
