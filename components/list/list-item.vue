
<!-- 单个列表 -->
<template>
	<list-scroll class="list-scroll" @loadmore="loadmore">
		<list-card :item="item" v-for="item in list" :key="item._id"></list-card>
		<uni-load-more iconType="snow" :status="load.loading"></uni-load-more>
	</list-scroll>
</template>

<script>
	export default {
		props: {
			list: {
				default() {
					return []
				},
				type: Array
			},
			load: {
				type: Object,
				default() {
					return {
						loading: 'loading'
					}
				}
			}
		},
		methods: {
			loadmore() {
				this.$emit('loadmore')
			}
		}
	}
</script>

<style>
	.list-scroll {
		height: 100%;
	}
</style>
