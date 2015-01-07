var mongodb = require('./db'),
	ObjectID = require('mongodb').ObjectID;

function Comment(id, comment) {
	this.id = id;
	this.comment = comment;
}

module.exports = Comment;

Comment.prototype.save = function(callback) {
	var _id = this.id,
		comment = this.comment;
	//打开数据库
	mongodb.open(function(err, db) {
		if (err) {
			return callback(err);
		}
		//读取 posts 集合
		db.collection('posts', function(err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			//通过用户名、时间及标题查找文档，并把一条留言对象添加到该文档的 comments 数组里
			collection.update({
				"_id": new ObjectID(_id)
			}, {
				$push: {
					"comments": comment
				}
			}, function(err) {
				mongodb.close();
				if (err) {
					return callback(err);
				}
				callback(null);
			});
		});
	});
};