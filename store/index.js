import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		userinfo: uni.getStorageSync('USER_INFO') || {},
		historyList: uni.getStorageSync('history') || []
	},
	mutations: {
		SET_USER_INFO(state, userinfo) {
			uni.setStorageSync('USER_INFO', userinfo)
			state.userinfo = userinfo
		},
		SET_HISTORY_LIST(state, historyList) {
			uni.setStorageSync('history', historyList)
			state.historyList = historyList
		},
		CLEAR_HISTORY(state) {
			uni.clearStorageSync('history')
			state.historyList = []
		}
	},
	actions: {
		set_userinfo({commit}, userinfo) {
			commit('SET_USER_INFO', userinfo)
		},
		set_history({commit, state}, history) {
			const historyList = state.historyList // 只能获取，不能操作
			historyList.unshift(history)
			commit('SET_HISTORY_LIST', historyList)
		}
	}
})

export default store