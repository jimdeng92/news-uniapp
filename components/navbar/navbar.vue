<template>
	<view class="navbar">
		<view class="navbar-fixed">
			<view class="navbar-search">
				<view class="navbar-search-icon"></view>
				<view class="navbar-search-text">uni-app</view>
			</view>
		</view>
		<view style="height: 45px;"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.navbar {
	.navbar-fixed {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 99;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0 15px;
		width: 100%;
		height: 45px;
		background-color: $mk-base-color; // uni.scss 定义
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
				width: 10px;
				height: 10px;
				border: 1px solid red;
				margin-right: 10px;
			}
			.navbar-search-text {
				font-size: 12px;
				color: #999;
			}
		}
	}
}
</style>
