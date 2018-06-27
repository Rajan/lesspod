'use strict';
module.exports = (sequelize, DataTypes) => {
	var Page = sequelize.define('Page', {
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4
		},
		name: { type: DataTypes.STRING, allowNull: false, unique: false },
		menuId: { type: DataTypes.STRING, allowNull: false, unique: false },
		userId: { type: DataTypes.STRING, allowNull: false, unique: false },

	});

	Page.associate = function(models){
		this.Menus = this.belongsToMany(models.Menu, {through: 'MenuPage'});
	};

	Page.prototype.toWeb = function (pw) {
		let json = this.toJSON();
		return json;
	};
	Page.sync({force: false});
	return Page;
};