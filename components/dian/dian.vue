<template>
  <view class="mr-top20 bg-fff pd-20 dian">
    <view class="hd flex flex-b ai-c" @click="go(brand.jumpURL)">
    	<view class="flex">
    		<image :src="brand.brandLogo" mode="" class="brand"></image>
			<view class="">
				<view class="f14">
					{{brand.merchantName}}
				</view>
				<view class="color-a0a0">
					{{brand.brandSlogan}}
				</view>
			</view>
    	</view>
		<view class="color-zong">
			进入店铺 >
		</view>
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
		  brand:{}
	  }
    },
    methods: {
		go(url){
			this.$utils.go(url)
		}
	},
    mounted() {
	this.brand=this.goods.brand
		// console.log(this.brand)
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
	.dian {
		height: 120rpx;
		.brand {
			height: 100rpx;
			width: 100rpx;
		}
	}

</style>
