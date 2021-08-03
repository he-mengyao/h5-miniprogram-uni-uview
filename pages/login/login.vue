<template>
	<view class="">
		<u-navbar back-text=" " title="登录"></u-navbar>
		<view class="box flex ai-c col">
			<view class="border">
				<u-field v-model="nickName" label="账户名" placeholder="请填写账户名">
				</u-field>
				<u-field v-model="password" label="密码" placeholder="请填写密码">
				</u-field>
			</view>
			<view class="btn flex ai-c flex-c cw f16 mr-top20" @click="login">
				登录/注册
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
				nickName: '',
				password: ''
			}
		},
		methods: {
			// 点击登录
			login(){
				if (this.nickName!==''&&this.password!=='' && !/^\d{1,}$/.test(this.nickName)){
					let obj = {nickName:this.nickName}
					uni.setStorageSync('user',obj)
					uni.navigateBack()
				}else {
					uni.showToast({
						title:'表单填写有误，请检查',
						icon:'none'
					})
				}
			}
		},
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
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		width: 500rpx;
		.btn {
			width: 300rpx;
			height: 60rpx;
			border-radius: 30rpx;
			background-color: #41a863;
		}
	}
</style>
