<template>
	<view>
		<view class="feedback-title">意见反馈：</view>
		<view class="feedback-content">
			<textarea class="feedback-textarea" placeholder="请输入您要反馈的内容" v-model="content"></textarea>
		</view>
		<view class="feedback-title">反馈图片：</view>
		<view class="feedback-image-box">
			<view class="feedback-image-item" v-for="(item, index) in imageList" :key="index">
				<view class="close-icon" @click="handleDeleteImg(index)">
					<uni-icons type="closeempty" size="18" color="#fff"></uni-icons>
				</view>
				<view class="image-box">
					<image :src="item.url" mode="aspectFill"></image>
				</view>
			</view>
			<view v-if="imageList.length < 5" class="feedback-image-item" @click="handleAddImage">
				<view class="image-box">
					<uni-icons type="plusempty" size="50" color="#eee"></uni-icons>
				</view>
			</view>
			<button class="feedback-button" type="primary" @click="handleSubmit">提交反馈意见</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: '',
				imageList: []
			}
		},
		methods: {
			handleDeleteImg(index) {
				this.imageList.splice(index, 1)
			},
			handleAddImage() {
				const count = 5 - this.imageList.length
				uni.chooseImage({
					count: count,
					success: (res) => {
						const tempFilePaths = res.tempFilePaths
						tempFilePaths.forEach((item, index) => {
							if (index < count) {
								this.imageList.push({
									url: item
								})
							}
						})
					}
				})
			},
			async handleSubmit() {
				let imagesPath = []
				uni.showLoading()
				for(let i = 0; i < this.imageList.length; i++) {
					const filepath = this.imageList[i].url
					const path = await this.uploadFile(filepath)
					imagesPath.push(path)
				}
				this.$api.update_feedback({
					feedbackImages: imagesPath,
					content: this.content
				}).then(res => {
					uni.hideLoading()
					uni.showToast({
						title: '提交成功'
					})
					setTimeout(() => {
						uni.switchTab({
							url: '../tabbar/my/my'
						})
					}, 1500)
				}).catch(err => {
					uni.hideLoading()
					uni.showToast({
						title: '提交失败'
					})
				})
			},
			async uploadFile(filepath) {
				console.log(filepath)
				const result = await uniCloud.uploadFile({
					filePath: filepath,
					cloudPath: 'linhe.jpg'
				})
				return result.fileID
			}
		}
	}
</script>

<style lang="scss">
.feedback-title {
	margin: 15px;
	margin-bottom: 0;
	font-size: 14px;
	color: #666;
}
.feedback-content {
	margin: 15px;
	padding: 10px;
	box-sizing: border-box;
	border: 1px solid #eee;
	.feedback-textarea {
		font-size: 12px;
		width: 100%;
		height: 100%;
	}
}
.feedback-image-box {
	display: flex;
	flex-wrap: wrap;
	padding: 10px;
	.feedback-image-item {
		position: relative;
		width: 33.33%;
		height: 0;
		padding-top: 33.33%;
		box-sizing: border-box;
		.close-icon {
			display: flex;
			justify-content: center;
			align-items: center;
			position: absolute;
			right: 0;
			top: 0;
			width: 22px;
			height: 22px;
			border-radius: 50%;
			background-color: #ff5aff;
			z-index: 2;
		}
		.image-box {
			display: flex;
			justify-content: center;
			align-items: center;
			position: absolute;
			top: 5px;
			bottom: 5px;
			left: 5px;
			right: 5px;
			border: 1px solid #eee;
			border-radius: 5px;
			overflow: hidden;
			image {
				width: 100%;
				height: 100%;
			}
		}
	}
}
.feedback-button {
	margin: 0 15px;
	background-color: $mk-base-color;
	width: 100%;
}
</style>
