var mongodb = require('./db'),
	markdown = require('markdown').markdown,
	ObjectID = require('mongodb').ObjectID;

function Post(name, title, post, magnet, tags) {
	this.name = name;
	this.title = title;
	this.post = post;
	this.magnet = magnet;
	this.tags = tags;
}

module.exports = Post;

Post.prototype.save = function(callback) {
	var date = new Date();
	var time = {
		date: date,
		year: date.getFullYear(),
		month: date.getFullYear() + "-" + (date.getMonth() + 1),
		day: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
		minute: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +
			date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
	}
	var tags = this.tags.split(",");

	var post = {
		name: this.name,
		time: time,
		title: this.title,
		post: this.post,
		magnet: this.magnet,
		tags: tags,
		comments: []
	};

	mongodb.open(function(err, db) {
		if (err) {
			return callback(err);
		}

		db.collection("posts", function(err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}

			collection.insert(post, {
				safe: true
			}, function(err) {
				mongodb.close();
				if (err) {
					return callback(err);
				}
				callback(null);
			});
		});
	});
}

Post.getSome = function(name, page, nums, callback) {
	mongodb.open(function(err, db) {
		if (err) {
			return callback(err);
		}
		db.collection("posts", function(err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}

			var query = {};
			if (name) {
				query.name = name;
			}
			collection.count(query, function(err, total) {
				collection.find(query, {
					skip: (page - 1) * nums,
					limit: nums
				}).sort({
					time: -1
				}).toArray(function(err, docs) {
					mongodb.close();
					if (err) {
						return callback(err);
					}
					docs.forEach(function(doc) {
						doc.post = markdown.toHTML(doc.post);
					});
					callback(null, docs, total);
				});
			});
		});
	});
}

Post.getAll = function(name, callback) {
	mongodb.open(function(err, db) {
		if (err) {
			return callback(err);
		}

		db.collection("posts", function(err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}

			var query = {};
			if (name) {
				query.name = name;
			}
			collection.find(query).sort({
				time: -1
			}).toArray(function(err, docs) {
				mongodb.close();
				if (err) {
					return callback(err); //失败！返回 err
				}
				docs.forEach(function(doc) {
					doc.post = markdown.toHTML(doc.post);
				});
				callback(null, docs); //成功！以数组形式返回查询的结果
			});
		});
	});
}

Post.getOne = function(_id, callback) {
	mongodb.open(function(err, db) {
		if (err) {
			return callback(err);
		}

		db.collection("posts", function(err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			collection.findOne({
				'_id': new ObjectID(_id)
			}, function(err, doc) {
				mongodb.close();
				if (err) {
					return callback(err);
				}

				doc.post = markdown.toHTML(doc.post);
				doc.comments.forEach(function(comment) {
					comment.content = markdown.toHTML(comment.content);
				});

				callback(null, doc);
			});
		});
	});
}

Post.edit = function(_id, callback) {
	mongodb.open(function(err, db) {
		if (err) {
			return callback(err);
		}

		db.collection("posts", function(err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}

			collection.findOne({
				"_id": new ObjectID(_id)
			}, function(err, doc) {
				mongodb.close();
				if (err) {
					return callback(err);
				}

				callback(null, doc);
			});
		});
	});
}

Post.update = function(_id, content, callback) {
	console.log(_id, content)
	mongodb.open(function(err, db) {
		if (err) {
			return callback(err);
		}
		db.collection("posts", function(err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}

			collection.update({
				"_id": new ObjectID(_id)
			}, {
				$set: {
					post: content
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
}

Post.remove = function(_id, callback) {
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
			collection.remove({
				"_id": new ObjectID(_id)
			}, {
				w: 1
			}, function(err) {
				mongodb.close();
				if (err) {
					return callback(err);
				}
				callback(null);
			});
		});
	});
}

//返回通过标题关键字查询的所有文章信息
Post.search = function(keyword, callback) {
	mongodb.open(function(err, db) {
		if (err) {
			return callback(err);
		}
		db.collection('posts', function(err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			var pattern = new RegExp(keyword, "i");
			collection.find({
				"title": pattern
			}, {
				"name": 1,
				"time": 1,
				"title": 1
			}).sort({
				time: -1
			}).toArray(function(err, docs) {
				mongodb.close();
				if (err) {
					return callback(err);
				}
				callback(null, docs);
			});
		});
	});
};