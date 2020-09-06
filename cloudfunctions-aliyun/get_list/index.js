'use strict';

const db = uniCloud.database()

exports.main = async (event, context) => {

	const {
		name,
		page = 1,
		pageSize = 10
	} = event
	
	let matchParams = {}
	if (name !== '全部') {
		matchParams = {
			classify: name
		}
	}

	// 聚合
	const list = await db.collection('article')
		.aggregate()
		.match(matchParams)
		.project({
			content: false
		})
		.skip(pageSize * (page - 1))
		.limit(pageSize)
		.end()

	//返回数据给客户端
	return {
		code: 200,
		message: '数据请求成功',
		data: list.data
	}
};
