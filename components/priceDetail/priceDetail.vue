<template>
	<view v-if="goods.goodsInfo" class="bg-fff pd-20">
		<view class="flex flex-b ai-c">
			<view class="flex ai-c">
				<view class="co-red fw f14 mr-r20">
					￥{{goods.goodsInfo.priceMin/100}}
				</view>
				<view class="color-a0a0 del">
					￥{{goods.goodsInfo.marketPrice/100}}
				</view>
			</view>
			<view class="">
				<image  @click='collect(goods.goodsInfo)' src="../../static/icon/product_unfavor.png" mode="" v-if="flag"
					class="shoucang"></image>
				<image  @click='collect(goods.goodsInfo)' src="../../static/icon/product_favor.png" mode="" v-if="!flag"
					class="shoucang"></image>
					<u-toast ref="uToast" />
			</view>
		</view>
		<!-- 标题 -->
		<view class="fw f14">
			{{goods.goodsInfo.name}}
		</view>
		<view class="color-a0a0 lue1 mr-tb10">
			{{goods.goodsInfo.summary}}
		</view>
		<view class="co-red">
			{{goods.goodsInfo.shortSummary}}
		</view>
		<view class="co-red tag">

		</view>
	</view>

</template>

<script>
	export default {
		components: {},
		props: {
			goods:{
				type:Object,
				required:true
			}
		},
		data() {
			return {
				// 收藏状态
				flag:true
			}
		},
		methods: {
			// 点击收藏
			collect(goodsInfo){
				this.flag=!this.flag
				if(!this.flag){
					this.$refs.uToast.show({
						title:'收藏成功',
						type: 'success',
					})
					this.save(goodsInfo)
				}else {
					this.$refs.uToast.show({
						title:'取消收藏成功',
						type: 'success',
					})
					this.$utils.saveCollect({
						key:'collect',
						data:goodsInfo,
						attr:'gid'
					})
				}
			},
			save(data){
				this.$utils.saveHistory({
					key:'collect',
					data:data,
					attr:'gid'
				})
			},
			getcollect(){
				let a = this.$utils.getHistory({key:'collect'})
				if (a){
					let obj =a.find(item=>{
						return item.gid === this.goods.goodsInfo.gid
					})
					if(obj){
						this.flag=false
						// console.log(this.flag)
					}else {
						this.flag=true
					}
				}
			}
		},
		mounted() {
			// console.log(this.goods.goodsInfo)
			this.getcollect()
			
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
		.shoucang {
			height: 80rpx;
			width: 80rpx;
		}
</style>
