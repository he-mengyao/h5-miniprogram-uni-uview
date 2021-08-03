// #ifdef APP-PLUS || APP-PLUS-NVUE || MP-WEIXIN
  import Fly from 'flyio/dist/npm/wx'
// #endif

// #ifdef H5
  import Fly from 'flyio/dist/npm/fly'
// #endif

const fly = new Fly

// 基础路径
fly.config.baseURL = 'https://api.weitao.galaxy-x.cn/api'

// 请求拦截
// 每次发请求的时候会触发
fly.interceptors.request.use(config => {
  uni.showLoading({
    title: '加载中...'
  })
  return config
}, err => {
  uni.hideLoading()
      // 每次请求失败的状态码
      let status = err.response && err.response.status
      if (status === 400) {
          uni.showToast({
            title: '参数错误',
          })
      }
      if (status === 401) {
        uni.showToast({
          title: '登录过期',
        })
      }
      if (status === 403) {
        uni.showToast({
          title: '没有权限',
        })
      }
      if (status === 404) {
        uni.showToast({
          title: '路径错误',
        })
      }
      if (status === 500) {
        uni.showToast({
          title: '服务器错误',
        })
      }
      if (status === 503) {
        uni.showToast({
          title: '服务器维护',
        })
      }
  return Promise.reject(err)
})


// 响应拦截
// 每一次请求有结果的时候会触发
fly.interceptors.response.use(res => {
  uni.hideLoading()
  return res.data
}, err => {
  uni.hideLoading()
  console.log(err)
})

export default fly
