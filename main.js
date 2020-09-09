import Vue from 'vue'
import App from './App'
import store from './store'
import Api from '@/common/api'

Vue.config.productionTip = false
Vue.prototype.$api = Api

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
