export default (options) => {
	const {url, data} = options
	return new Promise((resolve, reject) => {
		uniCloud.callFunction({
			name: url,
			data
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