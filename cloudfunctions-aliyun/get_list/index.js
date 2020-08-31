'use strict';

const db = uniCloud.database()

exports.main = async (event, context) => {

	const {
		name
	} = event

	// 聚合
	const list = await db.collection('article')
		.aggregate()
		.match({
			classify: name
		})
		.project({
			content: false
		})
		.end()

	//返回数据给客户端
	return {
		code: 200,
		message: '数据请求成功',
		data: list.data
	}
};
