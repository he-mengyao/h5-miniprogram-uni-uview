import Vue from 'vue'
import App from './App'
import api from './http/api.js'
import utils from './utils/util.js'
import store from './store'
import uView from "uview-ui";

Vue.use(uView);
Vue.prototype.$api = api
Vue.prototype.$utils = utils
Vue.prototype.$store = store
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
