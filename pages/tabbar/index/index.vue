<template>
	<view class="home">
		<!-- easyCom -->
		<navbar></navbar>
		<tab :list="tabList" @tab="tabItemClickHandle"></tab>
		
		<list-scroll>
			<list-card mode="base"></list-card>
			<list-card mode="image"></list-card>
			<list-card mode="column"></list-card>
		</list-scroll>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				tabList: []
			}
		},
		onLoad() {
			this.getLabel()
		},
		methods: {
			tabItemClickHandle({item, index}) {
				// console.log(item, index)
			},
			getLabel() {
				this.$api.get_label().then(res => {
					this.tabList = res.data
				})
			}
		}
	}
</script>

<style style="scss">
	page {
		height: 100%;
		display: flex;
	}
	.home {
		display: flex;
		flex-direction: column;
		flex: 1;
		overflow: hidden;
	}
</style>
