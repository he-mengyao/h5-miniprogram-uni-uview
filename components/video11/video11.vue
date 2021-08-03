<template>
	<view v-if="carouselMapList">
		<swiper class="img_img" style="height: 600rpx;width: 100%;" indicator-dots="true" interval="2000" duration="500"
			aspectFit='true'>
			<swiper-item v-if="video!=''">
				<video :src="video" id="myVideo" style="width: 100%; height: 100%;" controls='false' loop='true'
					autoplay='true'></video>
			</swiper-item>
			<swiper-item v-for="item in image_list" :key="item">
				<image :src="item" class="img_img" style="height: 600rpx;"></image>
			</swiper-item>
		</swiper>
	</view>

</template>

<script>
	export default {
		components: {},
		props: {
			carouselMapList: {
				type: Array,
				required: true
			}
		},
		data() {
			return {
				video: '',
				image_list: []
			}
		},
		methods: {
			// 数据处理
			getData() {
				let p1 = this.carouselMapList[0].url
				if (this.getFileType(p1) === 'video') {
					this.video = p1
					this.carouselMapList.map(item => {
						if (this.getFileType(item.url) != 'video') {
							this.image_list.push(item.url)
						}
					})
				} else {
					this.carouselMapList.map(item => {
						this.image_list.push(item.url)
					})
				}
				// console.log(this.video)
				// console.log(this.image_list)
			},
			//获取文件类型
			getFileType(fileName) {
				// 后缀获取
				let suffix = '';
				// 获取类型结果
				let result = '';
				try {
					const flieArr = fileName.split('.');
					suffix = flieArr[flieArr.length - 1];
				} catch (err) {
					suffix = '';
				}
				// 图片格式
				const imglist = ['png', 'jpg', 'jpeg', 'bmp', 'gif'];
				// 进行图片匹配
				result = imglist.find(item => item === suffix);
				if (result) {
					return 'image';
				}
				// 匹配 视频
				const videolist = ['mp4', 'm2v', 'mkv', 'rmvb', 'wmv', 'avi', 'flv', 'mov', 'm4v'];
				result = videolist.find(item => item === suffix);
				if (result) {
					return 'video';
				}
			}
		},
		mounted() {
			// console.log(this.carouselMapList)
			this.getData()
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
	.img_img {
		width: 100%;
	}
</style>
