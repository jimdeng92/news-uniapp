'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate

exports.main = async (event, context) => {
	// const label = await db.collection('label').get()
	
	const { user_id, type } = event
	let matchObj = {}
	// 是否返回所有标签，不填默认返回“我的标签“
	if (type !== 'all') {
		matchObj = {
			current: true
		}
	}
	
	// 查找用户信息
	const userInfo = await db.collection('user').doc(user_id).get()
	const ui = userInfo.data[0]
	
	let label = await db.collection('label')
		.aggregate() // 聚合
		.addFields({ // 在表中添加字段
			current: $.in(['$_id', $.ifNull([ui.label_ids, []])]) // 非空判断，是空返回第二个参数（空数组)
		})
		.match(matchObj) // 匹配字段
		.end() // 结束符
	
	//返回数据给客户端
	return {
		code: 200,
		message: '数据请求成功',
		data: label.data
	}
};
