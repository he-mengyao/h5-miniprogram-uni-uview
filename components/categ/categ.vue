<template>
  <view class="categ flex wrap flex-a">
    <view class="item flex col ai-c flex-c" v-for="(item,index) in categList" :key='index' @click="go(item.item.jump_url)">
    	<image :src="item.item.pic_url"></image>
		<view class="title">
			{{item.item.title}}
		</view>
    </view>
  </view>

</template>

<script>
  export default {
    components: {},
    props: {
		categList:{
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
	// console.log(this.categList)
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
	height: 300rpx;
	background-image: url('https://img.youpin.mi-img.com/comment/684f431f88252bf9ee2675cf9a06c9fc.png?w=516&h=258');
}
.item {
	width: 140rpx;
	image {
		height: 100rpx;
		width: 100rpx;
	}
}
</style>
