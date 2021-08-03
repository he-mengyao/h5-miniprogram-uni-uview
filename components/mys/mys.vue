<template>
  <view>
    <view class=" bg-fff boder-r10 mr-top20 box" :class="{'floor1':title==='我的订单'}">
    	<view class="order-hd flex flex-b ai-c pd-20 border-b">
    		<view class="fw f14">
    			{{title}}
    		</view>
			<view class="color-999" v-if="title==='我的订单'" @click="checkLogin({name:'全部',url:'/pages/order/order',index:0})">
				全部订单 >
			</view>
    	</view>
    	<view class="order-bd flex wrap">
    		<view class="flex col ai-c item" v-for="(item,index) in list" :key='index' @click="checkLogin({name:item.title,url:item.link,index:item.index})">
    			<image :src="item.url" mode="" class="icon1" :class="{'icon2':title==='更多工具'}"></image>
    			<view class="color-999">
    				{{index===0 && title==='我的功能'?num+'张'+item.title:item.title}}
    			</view>
    		</view>
    	</view>
    </view>
  </view>

</template>

<script>
  export default {
    components: {},
    props: {
		list:{
			type:Array,
			required:true
		},
		title:{
			type:String,
			required:true
		},
	},
    data() {
      return {
		  num:0
	  }
    },
    methods: {
		// 获取优惠券数量
		couponCount(){
			this.$api.couponCount().then(res=>{
				res=this.$utils.trriger(res)
				this.num=res.data.count
			}).catch(err=>{
				console.log('获取用户优惠券数量失败',err)
			})
		},
		// 跳转
		go(data){
			// console.log(data.url)
			if (data.url){
				if ( data.index!==''){
					uni.navigateTo({
						url:`${data.url}?title=${data.name}&index=${data.index}`
					})
				}else {
					uni.navigateTo({
						url:`${data.url}?title=${data.name}`
					})
				}
			}
		},
		checkLogin(data){
			this.$utils.checkLogin({
				key:'user',
				next:this.go,
				item:data,
			})
		}
	},
    mounted() {
		this.couponCount()
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
	.floor1 {
		/* #ifdef MP-WEIXIN */
		margin-top: -80rpx;
		/* #endif */
	}
	.item {
		width: 170rpx;
	}
	.icon2 {
		width: 80rpx;
		height: 80rpx;
	}
	.box {
		padding-bottom: 20rpx;
	}
</style>
