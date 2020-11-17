<template>
	<view>
		<uni-load-more v-if="lists.length === 0 && flag" status="loading"></uni-load-more>
		<list-card v-for="item in lists" :key="item.id" :item="item"></list-card>
		<view v-if="!flag" class="no-data">没有数据</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				lists: [],
				flag: true
			}
		},
		onLoad() {
			this.getMyArticle()
		},
		methods: {
			getMyArticle() {
				this.$api.get_my_article().then(res => {
					const {data} = res
					this.lists = data
					this.flag = false
				})
			}
		}
	}
</script>

<style>
.no-data {
	text-align: center;
	padding: 50px 0;
}
</style>
