<template>
	<view>
		<!-- 基础卡片 -->
		<view class="listcard" v-if="item.mode === 'base'">
			<view class="listcard-image">
				<image :src="itemCover[0]" mode="aspectFill"></image>
			</view>
			<view class="listcard-content">
				<view class="listcard-content__title">
					<text>{{item.title}}</text>
					<likes :item="item"></likes>
				</view>
				<view class="listcard-content__des">
					<view class="listcard-content__des-label">
						<view class="listcard-content__des-label-item">{{item.classify}}</view>
					</view>
					<view class="listcard-content__des-browse">{{item.browse_count}}人浏览</view>
				</view>
			</view>
		</view>
		
		<!-- 多图模式 -->
		<view class="listcard mode-column" v-if="item.mode === 'column'">
			<view class="listcard-content">
				<view class="listcard-content__title">
					<text>{{item.title}}</text>
					<likes :item="item"></likes>
				</view>
				<view class="listcard-image">
					<view class="listcard-image__item" v-for="item in itemCover" :key="item">
						<image :src="item" mode="aspectFill"></image>
					</view>
				</view>
				<view class="listcard-content__des">
					<view class="listcard-content__des-label">
						<view class="listcard-content__des-label-item">{{item.classify}}</view>
					</view>
					<view class="listcard-content__des-browse">{{item.browse_count}}人浏览</view>
				</view>
			</view>
		</view>
		
		<!-- 大图模式 -->
		<view class="listcard mode-image" v-if="item.mode === 'image'">
			<view class="listcard-image">
				<image :src="itemCover[0]" mode="aspectFill"></image>
			</view>
			<view class="listcard-content">
				<view class="listcard-content__title">
					<text>{{item.title}}</text>
					<likes :item="item"></likes>
				</view>
				<view class="listcard-content__des">
					<view class="listcard-content__des-label">
						<view class="listcard-content__des-label-item">{{item.classify}}</view>
					</view>
					<view class="listcard-content__des-browse">{{item.browse_count}}人浏览</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			mode: {
				type: String,
				default: 'base'
			},
			item: {
				type: Object,
				default() {
					return {}
				}
			}
		},
		computed: {
			itemCover() {
				if (!Array.isArray(this.item.cover)) return []
				return this.item.cover.filter((item, index) => index < 3)
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.listcard {
	display: flex;
	padding: 10px;
	margin: 10px;
	border-radius: 5px;
	box-shadow: 0 0 5px 1px rgba($color: #000, $alpha: 0.1);
	box-sizing: border-box;
	.listcard-image {
		flex-shrink: 0;
		width: 60px;
		height: 60px;
		border-radius: 5px;
		overflow: hidden;
		image {
			width: 100%;
			height: 100%;
		}
	}
	.listcard-content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding-left: 10px;
		width: 100%;
		.listcard-content__title {
			position: relative;
			padding-right: 30px;
			font-size: 14px;
			color: #333;
			line-height: 1.2;
			text {
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
			}
		}
		.listcard-content__des {
			display: flex;
			justify-content: space-between;
			font-size: 12px;
			.listcard-content__des-label {
				display: flex;
				.listcard-content__des-label-item {
					padding: 0 5px;
					margin-right: 5px;
					border-radius: 5px;
					color: $mk-base-color;
					border: 1px solid $mk-base-color;
				}
			}
			.listcard-content__des-browse {
				color: #999;
				line-height: 1.5;
			}
		}
	}
	
	&.mode-column {
		.listcard-content {
			width: 100%;
			padding-left: 0;
			.listcard-content__des {
				margin-top: 10px;
			}
		}
		.listcard-image {
			display: flex;
			margin-top: 10px;
			width: 100%;
			height: 70px;
			.listcard-image__item {
				margin-left: 10px;
				width: 100%;
				border-radius: 5px;
				overflow: hidden;
				&:first-child {
					margin-left: 0;
				}
				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
	
	&.mode-image {
		flex-direction: column;
		.listcard-image {
			width: 100%;
			height: 100px;
		}
		.listcard-content {
			padding-left: 0;
			margin-top: 10px;
			.listcard-content__des {
				display: flex;
				align-items: center;
				margin-top: 10px;
			}
		}
	}
}
</style>
