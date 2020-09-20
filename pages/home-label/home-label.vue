<template>
	<view class="label">
		<view class="label-box">
			<view class="label-header">
				<view class="label-title">我的标签</view>
				<view class="label-edit" @click="editHandle">{{ is_edit ? '完成' : '编辑'}}</view>
			</view>
			<view class="label-content">
				<view class="label-content__item" v-for="(item, index) in labelList" :key="item._id">
					{{item.name}}
					<uni-icons class="icon-close" type="clear" color="red" size="20" v-if="is_edit" @click="del(index)"></uni-icons>
				</view>
			</view>
		</view>
		<view class="label-box">
			<view class="label-header">
				<view class="label-title">标签推荐</view>
			</view>
			<view class="label-content">
				<view class="label-content__item" v-for="(item, index) in list" :key="item._id" @click="add(index)">
					{{item.name}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				is_edit: false,
				labelList: [],
				list: []
			}
		},
		onLoad() {
			this.getLabel()
		},
		methods: {
			del(index) {
				if (this.labelList.length <= 1) {
					this.showToast({
						title: '请至少保留一个标签'
					})
					return
				}
				this.list.push(this.labelList[index])
				this.labelList.splice(index, 1)
			},
			add(index) {
				if (!this.is_edit) return
				this.labelList.push(this.list[index])
				this.list.splice(index, 1)
			},
			async updateLabel(label) {
				uni.showLoading()
				await this.$api.update_label({ label })
				uni.hideLoading()
				uni.showToast({
					title: '更新成功'
				})
				// 页面间发送自定义事件，uni.$emit() 无法在清空了页面栈之后（刷新）发送
				uni.$emit('labelChange')
			},
			editHandle() {
				if (this.is_edit) {
					this.updateLabel(this.labelList.map(item => item._id))
				}
				this.is_edit = !this.is_edit
			},
			getLabel() {
				this.$api.get_label({
					type: 'all'
				}).then(res => {
					const {data} = res
					this.labelList = data.filter(item => item.current)
					this.list = data.filter(item => !item.current)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
page {
	background-color: #f5f5f5;
}
.label {
	.label-box {
		background-color: #fff;
		margin-bottom: 10px;
		.label-header {
			display: flex;
			justify-content: space-between;
			padding: 10px 15px;
			font-size: 14px;
			color: #666;
			border-bottom: 1px solid #f5f5f5;
			.label-edit {
				color: #30b33a;
				font-weight: bold;
			}
		}
		.label-content {
			display: flex;
			justify-content: flex-start;
			flex-wrap: wrap;
			padding: 15px;
			padding-top: 0;
			.label-content__item {
				padding: 2px 5px;
				margin-top: 12px;
				margin-right: 10px;
				border-radius: 5px;
				border: 1px solid #666;
				font-size: 14px;
				color: #666;
				position: relative;
				.icon-close {
					position: absolute;
					top: -8px;
					right: -8px;
					background-color: #fff;
					border-radius: 50%;
				}
			}
		}
	}
}
</style>
