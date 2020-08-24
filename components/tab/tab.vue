<template>
	<view class="tab">
		<scroll-view class="tab-scroll" scroll-x>
			<view class="tab-scroll__box">
				<view 
					class="tab-scroll__item" 
					:class="{active: activeIndex === index}"
					v-for="(item, index) in list" 
					:key="item.id"
					@click="tabClickHandle({item, index})">
					{{item.name}}
				</view>
			</view>
		</scroll-view>
		<view class="tab-icons">
			<uni-icons type="gear" size="26" color="#666"></uni-icons>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			list: {
				default() {
					return []
				},
				type: Array
			}
		},
		data() {
			return {
				activeIndex: 0
			};
		},
		methods: {
			tabClickHandle({item, index}) {
				// 不使用对象传参，第一个参数 undefined ???
				this.activeIndex = index
				this.$emit('tab', {item, index})
			}
		}
	}
</script>

<style lang="scss" scoped>
.tab {
	display: flex;
	width: 100%;
	border: 1px solid #f5f5f5;
	background-color: #fff;
	box-sizing: border-box;
	.tab-scroll {
		flex: 1;
		overflow: hidden;
		box-sizing: border-box;
		.tab-scroll__box {
			display: flex;
			align-items: center;
			flex-wrap: nowrap;
			height: 45px;
			box-sizing: border-box;
			.tab-scroll__item {
				flex-shrink: 0;
				padding: 0 10px;
				color: #333;
				font-size: 14px;
				&.active {
					color: $mk-base-color;
				}
			}
		}
	}
	.tab-icons {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 45px;
		&::before {
			content: '';
			position: absolute;
			left: 0;
			top: 12px;
			bottom: 12px;
			display: block;
			width: 1px;
			background-color: #ddd;
			
		}
	}
}
</style>
