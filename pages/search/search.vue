<template>
	<view class="search">
		<!-- #ifdef H5 -->
		<u-navbar back-text="" title="">
			<view class="slot-wrap" style="width: 90%;">
				<u-search :placeholder="text" v-model="value" :show-action="true" @search='search(value)' @custom='search(value)'>
				</u-search>
			</view>
		</u-navbar>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->
		<u-navbar back-text=" " title=" ">
			<view class="slot-wrap" style="width: 90%;">
				<u-search :placeholder="text" v-model="value" :show-action="false"></u-search>
			</view>
		</u-navbar>
		<!-- #endif -->
		<view class="bd" v-if="!show">
			<view class="content">
				<view class="history" v-if="searchHistory.length>0">
					<view class="h-title f14 flex ai-c">
						搜索历史 <image src="../../static/icon/del.png" mode="" class="img" @click="del"></image>
					</view>
					<view class="h-bd flex wrap">
						<view class="h-item flex ai-c flex-c bg-eee color-333" v-for="(item,index) in searchHistory"
							:key='index' @click="search(item.name)">
							{{item.name}}
						</view>
					</view>
				</view>
				<view class="find">
					<view class="flex flex-b ai-c">
						<view class="h-title f14 flex ai-c">
							搜索发现 <u-icon name="eye" size='40' color='#a0a0a0' class='eye' @click='hide'></u-icon>
						</view>
						<view class="change color-333" @click="change">
							换一批
						</view>
					</view>
					<view class="h-bd flex wrap" v-if="flag">
						<view class="h-item flex ai-c flex-c bg-eee color-333" v-for="(item,index) in hotWordsList"
							:key='index' v-if="item.queryName" @click="search(item.queryName)">
							<image src="../../static/icon/hot.png" mode="" v-if="item.hot" class="hot"></image>{{item.queryName}}
						</view>
					</view>
					<view class="color-a0a0 flex flex-c pd-20" v-if="!flag">
						已隐藏搜索发现
					</view>
				</view>
			</view>
			<view class="content2">

			</view>
		</view>
		<view class="search-content" v-if="show">
			<view class="mr-top20 flex flex-c f16" v-if="searchList.length===0">
				暂无数据
			</view>
			<view class="" v-if="searchList.length>0">
				<view class="mr-top20 pd-20 ser flex ai-c color-a0a0" v-for="(item,index) in searchList" 
				:key='index' @click="search(item.queryName)">
					<image src="../../static/search.png" mode="" class="hot mr-r20"></image>{{item.queryName}}
				</view>
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
				text: '',
				value: '',
				keyword: '',
				searchHistory: [],
				hotWordsList: [],
				// 热词的显示与隐藏
				flag: true,
				searchList:[],
				// 搜索列表的显示隐藏
				show:false
			}
		},
		methods: {
			gethotWords() {
				this.$api.hotWords().then(res => {
					res = this.$utils.trriger(res)
					this.hotWordsList = res.data
					// console.log(this.hotWordsList)
				}).catch(err => {
					console.log('获取热词失败', err)
				})
			},
			// 换一换
			change() {
				this.gethotWords()
			},
			// 隐藏热词
			hide() {
				this.flag = !this.flag
				uni.showToast({
					title:'已隐藏搜索发现',
					icon:'none',
				})
			},
			// 存储数据
			savehistory(value) {
				if (value.trim() !== '') {
					this.$utils.saveHistory({
						key: 'search',
						data: value.trim(),
						attr: 'name'
					})
				}
			},
			// 获取搜索历史
			gethistory() {
				let a = this.$utils.getHistory({
					key: 'search'
				})
				if (a) {
					this.searchHistory = a
				}
				// console.log(this.searchHistory )
			},
			// 点击搜索,点击热词
			search(value) {
				this.savehistory(value)
				this.gethistory()
				this.value = value
				uni.navigateTo({
					url:`/pages/searchList/searchList?value=${value}`
				})
			},
			// 清空搜索
			del() {
				uni.showModal({
					title:'提示',
					content:'您确定清空搜索记录吗？',
					success: () => {
						uni.removeStorageSync('searchHistory')
						this.searchHistory = []
						this.value = ''
					}
				})
			},
			// 获取搜索推荐关键词
			suggest(query){
				this.$api.suggest(query).then(res=>{
					res=this.$utils.trriger(res)
					this.searchList=res.data
					// console.log(res)
				}).catch(err=>{
					console.log('搜索推荐关键词请求失败')
				})
			}
			
		},
		mounted() {
			// 获取搜索历史
			this.gethotWords()
			this.gethistory()
		},
		onLoad(options) {
			this.text = options.text
		},
		onShow() {

		},
		filters: {},
		computed: {},
		watch: {
			value(val){
				if(val.trim()!==''){
					this.show=true
					let query =  val.trim()
					this.suggest(query)
				}else {
					this.show=false
				}
			}
		},
	}
</script>

<style scoped lang="scss">
	.hot {
		height: 30rpx;
		width: 30rpx;
	}
	.bd {
		padding: 0 20rpx;

		.img {
			width: 30rpx;
			height: 30rpx;
			margin-left: 20rpx;
		}

		.h-item {
			padding: 10rpx 20rpx;
			border-radius: 30rpx;
			margin: 20rpx;
			margin-left: 0;
		}

		.eye {
			margin-left: 20rpx;
		}
	}
	.ser {
		height: 60rpx;
		border-bottom: 1px solid #eee;
	}
</style>
