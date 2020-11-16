<script>
	export default {
		onLaunch: function() {
			this.$api.get_user({
				user_id: '5f5653b3290dfb0001f2a0fd'
			}).then(res => {
				const {data} = res
				this.$store.dispatch('set_userinfo', data)
			})
		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
