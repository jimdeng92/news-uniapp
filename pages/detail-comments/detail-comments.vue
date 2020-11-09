<template>
	<view>
		<view class="comments-content" v-for="item in commentsList" :key="item.comment_id">
			<comments-box :comments="item"></comments-box>
		</view>
		<uni-load-more v-if="commentsList.length === 0 || commentsList.length > 5" iconType="snow" :status="loading"></uni-load-more>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				articleId: '',
				commentsList: [],
				pageSize: 5,
				pageNum: 1,
				loading: 'loading'
			}
		},
		onReachBottom() {
			if (this.loading === 'noMore') return
			this.pageNum++
			this.getComments()
		},
		onLoad(query) {
			this.articleId = query.id
			this.getComments()
		},
		methods: {
			// 请求评论内容
			getComments() {
				this.$api.get_comments({
					article_id: this.articleId,
					pageSize: this.pageSize,
					pageNum: this.pageNum
				}).then(res => {
					const {data} = res
					if (data.length === 0) {
						this.loading = 'noMore'
						return
					}
					this.commentsList = this.commentsList.concat(data)
				})
			}
		}
	}
</script>

<style lang="scss">
.comments-content {
	padding: 0 15px;
}
</style>
