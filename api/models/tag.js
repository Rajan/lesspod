'use strict';
module.exports = (sequelize, DataTypes) => {
	var Tag = sequelize.define('Tag', {
		id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
		name: { type: DataTypes.STRING, allowNull: false, unique: false },
		postId: { type: DataTypes.STRING, allowNull: false, unique: false },
		userId: { type: DataTypes.STRING, allowNull: false, unique: false },

	});

	// Tag.associate = function(models){
	// 	this.Posts = this.belongsToMany(models.Post, {through: 'PostTag'});
	// };

	Tag.prototype.toWeb = function (pw) {
		let json = this.toJSON();
		return json;
	};
	Tag.sync({force: false});
	return Tag;
};