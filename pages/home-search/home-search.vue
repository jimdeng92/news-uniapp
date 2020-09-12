<template>
	<view class="home">
		<navbar :isSearch="true" @input="change" v-model="modelVal"></navbar>
		<view class="home-list">
			<view class="label-box" v-if="is_history">
				<view class="label-header">
					<text class="label-title">搜索历史</text>
					<text class="label-clear" @click="clearHandle">清空</text>
				</view>
				<view v-if="historyList.length > 0" class="label-content">
					<view class="label-content__item" v-for="item in historyList" @click="getHistory(item)">{{item.name}}</view>
				</view>
				<view class="no-data" v-else>
					没有搜索历史
				</view>
			</view>
			<!-- 搜索结果 -->
			<list-scroll class="list-scroll" v-else>
				<uni-load-more v-if="loading" status="loading" iconType="snow"></uni-load-more>
				<view v-if="historyList.length">
					<list-card :item="item" v-for="item in searchList" :key="item._id"></list-card>
				</view>
				<view v-if="searchList.length === 0 && !loading" class="no-data">
					没有搜索到相关数据
				</view>
			</list-scroll>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	
	const debounce = function (fn, delay) {
		let timer = null
		return function () {
			let args = arguments
			clearTimeout(timer)
			timer = setTimeout(() => {
				fn.apply(this, args)
			}, delay)
		}
	}
	
	export default {
		data() {
			return {
				is_history: true,
				searchList: [],
				modelVal: '',
				loading: false
			}
		},
		computed: {
			...mapState(['historyList'])
		},
		methods: {
			// 清空
			clearHandle() {
				
			},
			// 点击历史记录搜索
			getHistory(item) {
				this.modelVal = item.name
				this.is_history = false
				this.getSearch(item.name)
			},
			// change
			change: debounce(function (val) {
				if (val) {
					this.is_history = false
					this.getSearch(val)
				} else {
					this.is_history = true
				}
			}, 1500),
			// 搜索
			getSearch(val) {
				const hasVal = this.historyList.some(item => item.name === val)
				if (!hasVal) {
					this.$store.dispatch('set_history', {
						name: val
					})
				}
				this.loading = true
				this.$api.get_search({
					value: val
				}).then(res => {
					this.loading = false
					const {data} = res
					this.searchList = data
				}).catch(() => {
					this.loading = false
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		height: 100%;
		display: flex;
		background-color: #f5f5f5;
	}
	.home {
		display: flex;
		flex-direction: column;
		flex: 1;
		.label-box {
			background-color: #fff;
			margin-bottom: 10px;
			.label-header {
				display: flex;
				justify-content: space-between;
				font-size: 14px;
				color: #666;
				padding: 10px 15px;
				border-bottom: 1px solid #f5f5f5;
				.label-title {
					color: $mk-base-color;
				}
				.label-clear {
					color: #30b33a;
					font-weight: bold;
				}
			}
			.label-content {
				display: flex;
				flex-wrap: wrap;
				padding: 15px;
				padding-top: 0;
				.label-content__item {
					padding: 2px 10px;
					margin-top: 10px;
					margin-right: 10px;
					border-radius: 5px;
					border: 1px solid #666;
					font-size: 14px;
				}
			}
		}
		.no-data {
			line-height: 200px;
			height: 200px;
			width: 100%;
			text-align: center;
			color: #666;
			font-size: 12px;
		}
	}
</style>
