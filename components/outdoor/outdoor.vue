<template>
  <view class="flex wrap outdoor flex-a">
    <view class="item" v-for="(item,index) in outdoorList" :key='index' @click="go(item.item.jump_url)">
    	<image :src="item.item.pic_url" mode="" class="h-100 w-100"></image>
    </view>
  </view>

</template>

<script>
  export default {
    components: {},
    props: {
		outdoorList:{
			type:Array,
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
		// console.log(this.outdoorList)
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
	.outdoor {
		padding: 20rpx;
	}
	.item {
		height: 280rpx;
		width: 225rpx;
		margin-bottom: 20rpx;
	}

</style>
