<template>
	<view class="home">
		<navbar :isSearch="true" @input="change"></navbar>
		<view class="home-list">
			<view class="label-box">
				<view class="label-header">
					<text class="label-title">搜索历史</text>
					<text class="label-clear">清空</text>
				</view>
				<view v-if="historyList.length > 0" class="label-content">
					<view class="label-content__item" v-for="item in historyList">{{item.name}}</view>
				</view>
				<view class="no-data" v-else>
					没有搜索历史
				</view>
			</view>
			<button @click="testBtn">sdfasf</button>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	
	export default {
		data() {
			return {
				// historyList: []
			}
		},
		computed: {
			...mapState(['historyList'])
		},
		methods: {
			change(val) {
				console.log(val)
			},
			testBtn() {
				this.$store.dispatch('set_history', {
					name: 'test'
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
			.no-data {
				line-height: 200px;
				height: 200px;
				width: 100%;
				text-align: center;
				color: #666;
				font-size: 12px;
			}
		}
	}
</style>
