<template>
	<view class="mr-top20 bg-fff pd-20" @click="goDetail" v-if="data.total">
		<view class="hd flex flex-b ai-c mr-tb10">
			<view class="flex ai-c fw">
				问大家({{data.total}})
			</view>
			<u-icon name="arrow-right" size='30' color="#999999" class='right'></u-icon>
		</view>
		<view class="">
			<view class="flex ai-c color-999" v-for="(item,index) in list1" :key='index'>
				<image src="../../static/icon/ask_question.png" mode="" class="ask-img mr-r20"></image>
				{{item.ask}}
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		components: {},
		props: {
			ids: {
				type: String,
				required: true
			}
		},
		data() {
			return {
				list1:[],
				// list:[],
				data:{}
			}
		},
		methods: {
			// 请求
			askInfo(gid){
				this.$api.askInfo(gid).then(res=>{
					res=this.$utils.trriger(res)
					this.data=res.data
					// console.log(res.data)
					if(res.data.total>0){
						this.list1=res.data.list.slice(0,2)
					}
				}).catch(err=>{
					console.log('问答请求失败')
				})
			},
			// 跳转
			goDetail() {
				uni.navigateTo({
					url:`/pages/askDetail/askDetail?ids=${this.ids}`
				})
			}
		},
		mounted() {
			this.askInfo(this.ids)
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
	.hd {
		height: 40rpx;
		position: relative;

		.right {
			position: absolute;
			right: 20rpx;
			top: 20rpx;
		}
		}
</style>
