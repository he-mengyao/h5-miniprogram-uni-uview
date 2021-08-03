<template>
  <view class=" box flex ai-c flex">
    <view class="left">
    	<slot name="left"></slot>
    </view>
	<view class="middle">
		<slot name="middle"></slot>
	</view>
	<view class="right">
		<slot name="right"></slot>
	</view>
  </view>

</template>

<script>
  export default {
    components: {},
    props: {},
    data() {
      return {}
    },
    methods: {},
    mounted() {

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
	.box {
		position: relative;
		height: 95rpx;
		line-height: 95rpx;
		.left {
			position: absolute;
			left: 20rpx;
			top: 20rpx;
		}
		.right {
			position: absolute;
			right: 20rpx;
			top: 20rpx;
		}
	}

</style>
