<!-- 首页 -->

<template>
	<view class="home">
		<!-- easyCom -->
		<navbar></navbar>
		<tab :list="tabList" @tab="tabItemClickHandle" :tabIndex="tabIndex"></tab>
		<view class="home-list">
			<list :tab="tabList" @change="change" :tabIndex="tabIndex"></list>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				tabList: [],
				tabIndex: 0
			}
		},
		onLoad() {
			this.getLabel()
			uni.$on('labelChange', () => {
				// 清空
				this.tabList = []
				this.tabIndex = 0
				
				this.getLabel()
			})
		},
		methods: {
			change(current) {
				this.tabIndex = current
			},
			tabItemClickHandle({item, index}) {
				this.tabIndex = index
			},
			getLabel() {
				this.$api.get_label().then(res => {
					 const {data} = res
					 data.unshift({
						 name: '全部'
					 })
					 this.tabList = data
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		display: flex;
	}
	.home {
		display: flex;
		flex-direction: column;
		flex: 1;
		overflow: hidden;
		.home-list {
			flex: 1;
			box-sizing: border-box;
		}
	}
</style>
