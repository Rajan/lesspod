'use strict';
module.exports = (sequelize, DataTypes) => {
	var Model = sequelize.define('Post', {
		name: DataTypes.STRING
	});

	Model.associate = function(models){
		this.Users = this.belongsToMany(models.User, {through: 'UserPost'});
	};

	Model.prototype.toWeb = function (pw) {
		let json = this.toJSON();
		return json;
	};
	Model.sync({force: false});
	return Model;
};