
// import {get_label} from './list.js'

// export default {
// 	get_label
// }

// 自动导出
const requireApi = require.context(
	// api目录的相对路径
	'.',
	// 是否查询子目录
	false,
	// 查询文件的后缀
	/.js$/
)

let module = {}

requireApi.keys().forEach(item => {
	if (item === './index.js') return
	// 相当于把 requireApi(item) push 到 module 中
	Object.assign(module, requireApi(item))
})

export default module