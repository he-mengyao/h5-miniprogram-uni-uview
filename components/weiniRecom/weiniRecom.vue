<template>
  <view>
    <!-- 为你推荐 -->
    <view class="recom flex col">
    	<view class="recom-title ta-c">
    		<image src="../../static/icon/titile_left.png" mode="" class="icon"></image>为你推荐
    		<image src="../../static/icon/titile_right.png" mode="" class="icon"></image>
    	</view>
    	<view class="scroll_box">
    		<scroll-view scroll-y="true" @scrolltolower="scrolltolower" style="height: 100vh">
    			<view class="recom-bd mr-top20 flex wrap">
    				<view class="bg-fff boder-r10 rec-item" v-for="(item,index) in recommendResponseList"
    					:key='index' @click="go(item)">
    					<image :src="item.data.goods.picUrl" mode="" class="rec-pic"></image>
    					<view class="title f14 lue1">
    						{{item.data.goods.name}}
    					</view>
    					<view class="subtitle color-a0a0 lue1">
    						{{item.data.goods.summary}}
    					</view>
    					<view class="price flex">
    						<view class="color-red fw">
    							￥{{item.data.goods.priceMin/100}}
    						</view>
    						<view class="del color-a0a0">
    							￥{{item.data.goods.marketPrice/100}}
    						</view>
    					</view>
    				</view>
    			</view>
    		</scroll-view>
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
		  type: '7',
		  limit: '10',
		  offset: '1',
		  recommendResponseList: []
	  }
    },
    methods: {
		// 获取推荐
		recommend(type, offset, limit) {
			this.$api.recommend(type, offset, limit).then(res => {
				res = this.$utils.trriger(res)
				this.recommendResponseList = this.recommendResponseList.concat(res.data.recommendResponseList)
			}).catch(err => {
				console.log('推荐列表获取失败', err)
			})
		},
		// 下拉加载
		scrolltolower() {
			this.offset++
			this.recommend(this.type, this.offset, this.limit)
		},
		// 点击商品
		go(item){
			this.$utils.go(item.data.goods.jumpUrl)
		}
	},
    mounted() {
			this.recommend(this.type, this.offset, this.limit)
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
		.recom {
			margin-top: 50rpx;
			background-color: #f8f7fa;
			.rec-item {
				margin-top: 22rpx;
				margin-left: 24rpx;
				padding: 20rpx;
				width: 300rpx;
				height: 400rpx;
				/* #ifdef H5 */
				width: 340rpx;
				height: 450rpx;
				/* #endif */
			}

			.rec-pic {
				width: 100%;
				height: 280rpx;
			}
		}
</style>
