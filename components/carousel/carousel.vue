<template>
  <view>
    <view class="swipe">
    	<u-swiper :list="list" height='300' @click='click'></u-swiper>
    </view>
  </view>

</template>

<script>
  export default {
    components: {},
    props: {
		carouselList:{
			type:Array,
			required:true
		},
		bgimg:{
			type:Object,
			required:true
		}
	},
    data() {
      return {
		  list:[],
		  bgurl:[]
	  }
    },
    methods: {
		// 点击轮播图
		click(index){
			this.$utils.go(this.carouselList[index].item.jump_url)
			
		}
		
	},
    mounted() {
		// console.log(this.carouselList)
	this.carouselList.map(item=>{
		this.list.push(item.item.pic_url)
	})
	Object.values(this.bgimg).map((item,index)=>{
		// item.backgroundUrl=`url('${item.backgroundUrl}')`
		this.bgurl.push(item.backgroundUrl)
	})
	this.bgurl.push(Object.values(this.bgimg)[0].backgroundUrl)
		// console.log(this.bgurl)
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
	@import 'uview-ui/theme.scss';
.swipe {
	padding: 0 3.2%;
	background-color: #FFFFFF;
}
</style>
