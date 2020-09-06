<!-- 列表和 swiper -->
<template>
	<swiper class="home-swiper" @change="change" :current="tabIndex">
		<swiper-item class="swiper-item" v-for="(item, index) in tab" :key="index">
			<listItem :list="listCatchData[index]" :load="load[index]" @loadmore="loadmore"></listItem>
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
				listCatchData: {},
				load: {},
				pageSize: 5
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
			loadmore() {
				if (this.load[this.tabIndex].loading === 'noMore') return
				this.load[this.tabIndex].page++
				this.getList(this.tabIndex)
			},
			change(e) {
				const {current} = e.detail
				this.$emit('change', current)
				if (!this.listCatchData[current] || this.listCatchData[current].length === 0) {
					this.getList(current)
				}
			},
			getList(current) {
				if (!this.load[current]) {
					this.load[current] = {
						page: 1,
						loading: 'loading'
					}
				}
				this.$api.get_list({
					name: this.tab[current].name,
					page: this.load[current].page,
					pageSize: this.pageSize
				}).then(res => {
					const {data} = res
					if (data.length === 0) {
						this.load[current].loading = 'noMore'
						// 强制渲染页面
						// this.$forceUpdate()
						return
					}
					if (data.length < this.pageSize) {
						this.load[current].loading = 'noMore'
					}
					const oldList = this.listCatchData[current] || []
					oldList.push(...data)
					this.$set(this.listCatchData, current, oldList)
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
