<template>
	<view>
		<view class="my-header">
			<view class="my-header__background">
				<image :src="userinfo.avatar" mode="aspectFill"></image>
			</view>
			<view class="my-header__logo">
				<view class="my-header__logo-box">
					<image :src='userinfo.avatar' mode="aspectFill"></image>
				</view>
				<text class="my-header__name">{{userinfo.author_name}}</text>
			</view>
			<view class="my-header__info">
				<view class="my-header__info-box">
					<text class="my-header__info-title">被关注</text>
					<text>{{userinfo.follow_count}}</text>
				</view>
				<view class="my-header__info-box">
					<text class="my-header__info-title">粉丝</text>
					<text>{{userinfo.fans_count}}</text>
				</view>
				<view class="my-header__info-box">
					<text class="my-header__info-title">积分</text>
					<text>{{userinfo.integral_count || 0}}</text>
				</view>
			</view>
		</view>
		<view class="my-content">
			<view class="my-content__list">
				<view class="my-content__list-title">
					<uni-icons class="icons" type="contact" size="14" color="#666"></uni-icons>
					<text>我的文章</text>
				</view>
				<uni-icons type="arrowright" size="14" color="#666"></uni-icons>
			</view>
			<view class="my-content__list">
				<view class="my-content__list-title">
					<uni-icons class="icons" type="help" size="14" color="#666"></uni-icons>
					<text>意见反馈</text>
				</view>
				<uni-icons type="arrowright" size="14" color="#666"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	
	export default {
		data() {
			return {
				
			}
		},
		computed: {
			...mapState(['userinfo'])
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
page {
	background-color: #f5f5f5;
}
.my-header {
	padding-bottom: 15px;
	position: relative;
	.my-header__background {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		filter: blur(8px);
		opacity: .3;
		image {
			width: 100%;
			height: 100%;
		}
	}
	.my-header__logo {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 30px;
		.my-header__logo-box {
			width: 60px;
			height: 60px;
			border-radius: 50%;
			overflow: hidden;
			image {
				width: 100%;
				height: 100%;
			}
		}
		.my-header__name {
			margin-top: 15px;
			font-size: 16px;
			font-weight: bold;
		}
	}
	.my-header__info {
		margin-top: 15px;
		display: flex;
		.my-header__info-box {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width: 100%;
			font-size: 12px;
			color: #999;
			.my-header__info-title {
				font-size: 14px;
				color: #333;
			}
		}
	}
}
.my-content {
	.my-content__list {
		display: flex;
		justify-content: space-between;
		padding: 15px;
		margin-bottom: 10px;
		background-color: #fff;
		color: #333;
		font-size: 14px;
		.my-content__list-title {
			display: flex;
			align-items: center;
			.icons {
				margin-right: 10px;
			}
		}
	}
}
</style>
