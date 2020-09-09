<!-- navbar -->

<template>
	<view class="navbar">
		<view class="navbar-fixed">
			<!-- 状态栏 -->
			<view :style="{height: statusBarHeight + 'px'}"></view>
			<view class="navbar-content" :class="{search: isSearch}" @click.stop="open" :style="{height: navBarHeight + 'px', width: windowWidth + 'px'}">
				<view class="navbar-content__search-icons">
					<uni-icons type="back" size="22" color="#fff"></uni-icons>
				</view>
				<view v-if="!isSearch" class="navbar-search">
					<view class="navbar-search-icon">
						<!-- <text class="iconfont icon-search"></text> -->
						<!-- 使用 uni-icons 图标插件 -->
						<uni-icons type="search" size="16" color="#999"></uni-icons>
					</view>
					<view class="navbar-search-text">uni-app</view>
				</view>
				<view v-else class="navbar-search">
					<input type="text" @input="inputChange" class="navbar-search_text" v-model="val" placeholder="请输入您要搜索的内容">
				</view>
			</view>
		</view>
		<view :style="{height: navBarHeight + statusBarHeight + 'px'}"></view>
	</view>
</template>

<script>
	export default {
		props: {
			isSearch: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				statusBarHeight: 0, // 状态栏在 h5 中的高度
				navBarHeight: 44, // navbar 在 h5 中的高度
				windowWidth: 0, // 视口宽度
				val: ''
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
		},
		methods: {
			open() {
				if (this.isSearch) return
				uni.navigateTo({
					url: '/pages/home-search/home-search'
				})
			},
			inputChange(e) {
				this.$emit('input', e.target.value)
			}
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
			&.search {
				padding-left: 0;
				.navbar-content__search-icons {
					margin-left: 10px;
					margin-right: 10px;
				}
				.navbar-search {
					border-radius: 5px;
				}
			}
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
				.navbar-search_text {
					font-size: 14px;
					color: #999;
				}
			}
		}
		
	}
}
</style>
