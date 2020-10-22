'use strict';

const db = uniCloud.database()
const $ = db.command.aggregate
const dbCmd = db.command

exports.main = async (event, context) => {
	//event为客户端上传的参数
	const {
		user_id,
		article_id,
		content
	} = event
	
	let user = await db.collection('user').doc(user_id).get()
	user = user.data[0]
	
	let commentObj = {
		comment_id: genID(5),
		comment_content: content,
		create_time: new Date().getTime(),
		author: {
			author_id: user._id,
			author_name: user.author_name,
			avator: user.avator,
			professional: user.professional
		},
		replys: []
	}
	
	await db.collection('article').doc(article_id).update({
		comments: dbCmd.unshift(commentObj)
	})
	
	//返回数据给客户端
	return {
		code: 200,
		message: '数据更新成功'
	}
};


function genID(length) {
	return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36)
}