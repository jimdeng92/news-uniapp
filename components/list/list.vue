<template>
	<swiper class="home-swiper" @change="change" :current="tabIndex">
		<swiper-item class="swiper-item" v-for="(item, index) in tab" :key="index">
			<listItem></listItem>
		</swiper-item>
	</swiper>
</template>

<script>
	import listItem from './list-item.vue'
	
	export default {
		components: {listItem},
		props: {
			tab: {
				default() {
					return []
				},
				type: Array
			},
			tabIndex: {
				default: 0,
				type: Number
			}
		},
		data() {
			return {
				
			};
		},
		methods: {
			change(e) {
				const {current} = e.detail
				console.log(current)
				this.$emit('change', current)
			}
		}
	}
</script>

<style lang="scss">
.home-swiper {
	height: 100%;
	.swiper-item {
		height: 100%;
		overflow: hidden;
	}
	
}
</style>
