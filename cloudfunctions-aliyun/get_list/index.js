'use strict';

const db = uniCloud.database()
const $ = db.command.aggregate

exports.main = async (event, context) => {

	const {
		name,
		page = 1,
		pageSize = 10,
		user_id
	} = event
	
	let matchParams = {}
	if (name !== '全部') {
		matchParams = {
			classify: name
		}
	}

	const userinfo = await db.collection('user').doc(user_id).get()
	const article_likes_ids = userinfo.data[0].article_likes_ids

	// 聚合
	const list = await db.collection('article')
		.aggregate()
		// 追加字段
		.addFields({
			is_like: $.in(['$_id', article_likes_ids])
		})
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
