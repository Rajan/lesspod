'use strict';
module.exports = (sequelize, DataTypes) => {
	var Model = sequelize.define('Post', {
		id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
		title: { type: DataTypes.STRING, allowNull: false },
		content: { type: DataTypes.TEXT, allowNull: false },

	});

	Model.associate = function(models){
		this.Users = this.belongsToMany(models.User, {through: 'UserPost'});
		this.Tags = this.belongsToMany(models.Tag, {through: 'PostTag'});
	};

	Model.prototype.toWeb = function (pw) {
		let json = this.toJSON();
		return json;
	};
	Model.sync({force: false});
	return Model;
};