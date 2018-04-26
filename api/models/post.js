'use strict';
module.exports = (sequelize, DataTypes) => {

	var UserPost = sequelize.define('UserPost', {
		id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
		UserId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        PostId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
	});

	var PostTag = sequelize.define('PostTag', {
		id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
		PostId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        TagId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
	});

	var Post = sequelize.define('Post', {
		id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
		title: { type: DataTypes.STRING, allowNull: false },
		content: { type: DataTypes.TEXT, allowNull: false },

	});

	Post.associate = function(models){
		this.Users = this.belongsToMany(models.User, {through: 'UserPost'});
		this.Tags = this.belongsToMany(models.Tag, {through: 'PostTag'});
	};

	Post.prototype.toWeb = function (pw) {
		let json = this.toJSON();
		return json;
	};
	PostTag.sync({force: false});
	UserPost.sync({force: false});
	Post.sync({force: false});
	return Post;
};