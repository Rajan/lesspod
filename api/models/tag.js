'use strict';
module.exports = (sequelize, DataTypes) => {
	var Model = sequelize.define('Tag', {
		name: { type: DataTypes.STRING, allowNull: false, unique: true }
	});

	Model.associate = function(models){
		this.Posts = this.belongsToMany(models.Post, {through: 'PostTag'});
	};

	Model.prototype.toWeb = function (pw) {
		let json = this.toJSON();
		return json;
	};
	Model.sync({force: false});
	return Model;
};