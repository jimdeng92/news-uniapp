import store from '@/store'

export default (options) => {
	const {url, data} = options
	const dataObj = {
		user_id: store.state.userinfo._id,
		...data
	}
	return new Promise((resolve, reject) => {
		uniCloud.callFunction({
			name: url,
			data: dataObj
		}).then(res => {
			if (res.result.code === 200) {
				resolve(res.result)
			} else {
				reject(res.result)
			}
		}).catch(err => {
			reject(err)
		})
	})
}