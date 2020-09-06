<!-- navbar -->

<template>
	<view class="navbar">
		<view class="navbar-fixed">
			<!-- 状态栏 -->
			<view :style="{height: statusBarHeight + 'px'}"></view>
			<view class="navbar-content" :style="{height: navBarHeight + 'px', width: windowWidth + 'px'}">
				<view class="navbar-search">
					<view class="navbar-search-icon">
						<!-- <text class="iconfont icon-search"></text> -->
						<!-- 使用 uni-icons 图标插件 -->
						<uni-icons type="search" size="16" color="#999"></uni-icons>
					</view>
					<view class="navbar-search-text">uni-app</view>
				</view>
			</view>
		</view>
		<view :style="{height: navBarHeight + statusBarHeight + 'px'}"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				statusBarHeight: 0, // 状态栏在 h5 中的高度
				navBarHeight: 44, // navbar 在 h5 中的高度
				windowWidth: 0 // 视口宽度
			};
		},
		created() {
			// 获取手机系统信息
			const info = uni.getSystemInfoSync()
			// console.log(info)
			this.statusBarHeight = info.statusBarHeight
			this.windowWidth = info.windowWidth
			// 条件渲染
			// #ifndef H5 || APP-NVUE || MP-BAIDU
			// 微信中获取胶囊的位置
			const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
			// console.log(menuButtonInfo)
			this.navBarHeight = (menuButtonInfo.bottom - info.statusBarHeight) + (menuButtonInfo.top - info.statusBarHeight)
			this.windowWidth = menuButtonInfo.left
			// #endif
		}
	}
</script>

<style lang="scss">
@import '../../common/css/icons.css';
.navbar {
	.navbar-fixed {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 99;
		width: 100%;
		background-color: $mk-base-color; // uni.scss 定义
		.navbar-content {
			height: 45px;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 0 15px;
			box-sizing: border-box;
			.navbar-search {
				display: flex;
				align-items: center;
				padding: 0 10px;
				width: 100%;
				height: 30px;
				border-radius: 30px;
				background-color: #fff;
				.navbar-search-icon {
					margin-right: 10px;
				}
				.navbar-search-text {
					font-size: 12px;
					color: #999;
				}
			}
		}
		
	}
}
</style>
