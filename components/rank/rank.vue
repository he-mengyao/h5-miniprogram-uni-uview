<template>
  <view class="mr-top20 pd-20 bg-fff flex ai-c rank pr "  @click='go' v-if="title">
    <image src="../../static/rank.png" mode="" class="icon mr-r20"></image>
	<view class="fw 16 mr-r20">
		排行榜
	</view>
	<view class="fw">
		{{title}}
	</view>
	<u-icon name="arrow-right" size='30' color="#999999" class='right'></u-icon>
  </view>

</template>

<script>
  export default {
    components: {},
    props: {
		ids:{
			type:String,
			required:true
		}
	},
    data() {
      return {
		  title:'',
		  url:''
	  }
    },
    methods: {
		composeTwo(){
			this.$api.composeTwo(this.ids).then(res=>{
				res=this.$utils.trriger(res)
				if(res[1].data){
					this.title=res[1].data.text
					this.url=res[1].data.baseInfo.jumpUrl
				}
				// console.log(res)
			}).catch(err=>{
				console.log('排行请求失败',err)
			})
		},
		// 跳转
		go(){
			this.$utils.go(this.url)
		}
	},
    mounted() {
	this.composeTwo()
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
	.rank {
		height: 80rpx;
		.right {
			position: absolute;
			right: 40rpx;
			top: 20rpx;
		}
	}

</style>
