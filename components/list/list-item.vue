<template>
	<list-scroll class="list-scroll">
		<list-card :item="item" v-for="item in list" :key="item._id"></list-card>
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
			}
		}
	}
</script>

<style>
	.list-scroll {
		height: 100%;
	}
</style>
