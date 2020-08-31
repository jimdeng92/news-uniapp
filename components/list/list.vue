<template>
	<swiper class="home-swiper" @change="change" :current="tabIndex">
		<swiper-item class="swiper-item" v-for="(item, index) in tab" :key="index">
			<listItem :list="listCatchData[index]"></listItem>
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
				list: [],
				listCatchData: {}
			};
		},
		created() {
			// this.getList(this.tabIndex)
		},
		watch: {
			tab(val) {
				if(!val.length) return
				this.getList(this.tabIndex)
			}
		},
		methods: {
			change(e) {
				const {current} = e.detail
				this.getList(current)
				this.$emit('change', current)
			},
			getList(current) {
				this.$api.get_list({name: this.tab[current].name}).then(res => {
					const {data} = res
					// this.listCatchData[current] = data
					this.$set(this.listCatchData, current, data)
				})
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
