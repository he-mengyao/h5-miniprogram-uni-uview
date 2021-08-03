import fly from './index'
export default {
	STATIC_HOST: 'https://statics.zhuishushenqi.com',
	// 获取搜索推荐关键词
	suggest(query) {
		return fly.get(`/Search/suggest?query=${query}`)
	},
	// 获取搜索输入框占位词
	placeHolder() {
		return fly.get(`/Search/placeHolder`)
	},
	// 获取搜索热词
	hotWords() {
		return fly.get('/Search/hotWords')
	},
	// 获取可用优惠券数量
	couponCount() {
		return fly.get(`/User/couponCount`)
	},
	// BEST商品列表
	best() {
		return fly.get(`/HomePage/best`)
	},
	// 首页数据
	HomeData() {
		return fly.get('/HomePage/homeData')
	},
	// 按分类获取首页底部商品列表
	feeds(index, query_id) {
		return fly.get(`/HomePage/feeds?index=${index}&query_id)=${query_id}`)
	},
	// 一级分类
	list() {
		return fly.get('/Category/list')
	},
	// 通过一级分类获取二级分类
	detail(catId) {
		return fly.get(`/Category/detail?catId=${catId}`)
	},
	// 生活首页数据
	bktrSimple() {
		return fly.get('/Life/bktrSimple')
	},
	// 推荐文章
	getSimilarFeed() {
		return fly.get('/Life/getSimilarFeed')
	},
	// 生活板块
	getHomeTab(tab, page, pageSize) {
		return fly.get(`/Life/getHomeTab?tab=${tab}&page=${page}&pageSize=${pageSize}`)
	},
	// 文章详情
	detail1(id) {
		return fly.get(`/Life/detail?uuid=${id}`)
	},
	// 推荐商品
	recommend(type, offset, limit) {
		return fly.get(`/Goods/recommend?type=${type}&offset=${offset}&limit=${limit}}`)
	},
	// 获取可用优惠券数量
	couponCount() {
		return fly.get('/User/couponCount')
	},
	// 商品详情
	productdetail(gid) {
		return fly.get(`/Goods/detail?gid=${gid}`)
	},
	// 排行
	composeTwo(gid) {
		return fly.get(`/Goods/composeTwo?gid=${gid}`)
	},
	// 更多评价
	commentTag(gid) {
		return fly.get(`/Goods/commentTag?gid=${gid}`)
	},
	// 通过评价标签获取评价列表
	commentContent(gid, page, pageSize, tagId) {
		return fly.get(`/Goods/commentContent?gid=${gid}&page=${page}&pageSize=${pageSize}&tagId=${tagId}`)
	},
	// 问答
	askInfo(gid) {
		return fly.get(`/Goods/askInfo?gid=${gid}`)
	},
	// 获取搜索推荐关键词
	suggest(query) {
		return fly.get(`/Search/suggest?query=${query}`)
	},
	// 获取商品列表
	doSearch(query, sortBy, source) {
		return fly.post('/Goods/doSearch', {
			filter: {
				attr: [],
				brands: [],
				category1: [],
				category2: [],
				category3: [],
				maxPrice: null,
				minPrice: null,
				services: [],
				special: [],
				specialCoupon: [],
				tags: []
			},
			query: query,
			sortBy: sortBy,
			source: source
		})
	},
}
