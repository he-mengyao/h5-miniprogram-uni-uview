<template>
  <view class="flex flex-c mr-top20">
  	<view class="sale pd-20 bg-fff boder-r10 flex">
  	  <view class="item flex col ai-c flex-c" v-for="(item,index) in sale.data.items" :key='index' @click="go(item.item.jump_url)">
  	  	<view class="title f14 fw">
  	  		{{item.item.title}}
  	  	</view>
		<view class="subtitle color-brown lue1">
			{{item.item.subtitle}}
		</view>
		<image :src="item.item.pic_url1" mode="" class="img"></image>
  	  </view>
  	</view>
  </view>

</template>

<script>
  export default {
    components: {},
    props: {
		sale:{
			type:Object,
			required:true
		}
	},
    data() {
      return {}
    },
    methods: {
		// 跳转
		go(url){
			this.$utils.go(url)
		}
	},
    mounted() {
	// console.log(this.sale)
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
	.sale {
		width: 92%;
		.item {
			padding-right: 20rpx;
		}
		.img {
			height: 150rpx;
			width: 150rpx;
		}
	}

</style>
