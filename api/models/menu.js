'use strict';
module.exports = (sequelize, DataTypes) => {

	var UserMenu = sequelize.define('UserMenu', {
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
        MenuId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
	});

	var MenuPage = sequelize.define('MenuPage', {
		id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
		MenuId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        PageId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
	});

	var Menu = sequelize.define('Menu', {
		id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
		name: { type: DataTypes.STRING, allowNull: false },
		linkedPage: { type: DataTypes.STRING, allowNull: false },

	});

	Menu.associate = function(models){
		this.Users = this.belongsToOne(models.User, {through: 'UserMenu'});
		this.Page = this.belongsToOne(models.Page, {through: 'MenuPage'});
	};

	Menu.prototype.toWeb = function (pw) {
		let json = this.toJSON();
		return json;
	};
	MenuPage.sync({force: false});
	UserMenu.sync({force: false});
	Menu.sync({force: false});
	return Menu;

}