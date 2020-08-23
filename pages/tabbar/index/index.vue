<template>
	<view class="content">
		<!-- easyCom -->
		<navbar></navbar>
		<view v-for="item in 100">
			{{item}}-内容
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style style="scss">
</style>
