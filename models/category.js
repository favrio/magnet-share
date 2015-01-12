var mongodb = require('./db'),
	ObjectID = require('mongodb').ObjectID;

function Category(id, parent, name, nickname, description) {
	this.id = id;
	this.name = name;
	this.nickname = nickname;
	this.description = description;
}

module.exports = Category;

Category.prototype.save = function(callback) {
	
};