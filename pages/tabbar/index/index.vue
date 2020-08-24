<template>
	<view class="content">
		<!-- easyCom -->
		<navbar></navbar>
		<tab :list="tabList" @tab="tabItemClickHandle"></tab>
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
</style>
