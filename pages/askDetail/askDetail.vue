<template>
  <view class="bg-purple pd-20">
    <u-navbar :title="title"></u-navbar>
	<view class="hd flex ai-c bg-fff pd-20 color-a0a0 boder-r10" v-if="data.goods" @click="go(data.goods.jump_url)">
		<image :src="data.goods.img800s" mode="" class="img mr-r20"></image>
		{{data.goods.name}}
	</view>
	<view class="bd" v-if="list.length>0">
			<view class="item mr-top20 bg-fff pd-20 boder-r10" v-for="(item,index) in list" :key='index'>
				<view class="flex ai-c">
					<view class="mr-r20">
						<image src="../../static/icon/ask_question.png" mode="" class="ask-img"></image>
					</view>
					<view class="">
						{{item.ask}}
					</view>
				</view>
				<view class="" v-if="item.top_reply">
					<view class="flex ai-c color-a0a0" v-for="(item1,index1) in (item.top_reply)" :key='index1'>
						<view class="mr-r20 ai-c">
							<image src="../../static/icon/answer.png" mode="" class="ask-img"></image>
						</view>
							{{item1}}
					</view>
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
		  ids:'',
		  data:{},
		  list:[],
		  title:'',
	  }
    },
    methods: {
		// 请求
		askInfo(gid){
			this.$api.askInfo(gid).then(res=>{
				res=this.$utils.trriger(res)
				this.data=res.data
				console.log(res.data)
				if(res.data.total>0){
					this.list=res.data.list
				}
				console.log(this.list)
				this.title=`问大家(${this.data.total})`
				
			}).catch(err=>{
				console.log('问答请求失败')
			})
		},
		// 点击图片跳转
		go(url){
			this.$utils.go(url)
		}
	},
    mounted() {

    },
    onLoad(options) {
		this.ids=options.ids
		this.askInfo(this.ids)
    },
    onShow() {

    },
    filters: {},
    computed: {},
    watch: {},
  }
</script>

<style scoped lang="scss">
	.hd {
		height: 80rpx;
		.img {
			width: 60rpx;
			height: 60rpx;
		}
	}

</style>
