'use strict';
module.exports = (sequelize, DataTypes) => {

	var UserMenu = sequelize.define('UserMenu', {
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4
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
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4
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
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4
		},
		name: { type: DataTypes.STRING, allowNull: false },
		// underMenu: { type: DataTypes.STRING, allowNull: true },
		linkedURL: { type: DataTypes.STRING, allowNull: true },
		linkedPage: { type: DataTypes.STRING, allowNull: true },
		postId: { type: DataTypes.STRING, allowNull: true }
	});

	Menu.associate = function(models){
		this.Users = this.belongsToMany(models.User, {through: 'UserMenu'});
		this.Page = this.belongsToMany(models.Page, {through: 'MenuPage'});
	};

	// Menu.beforeSave(async (menu, options) => {
	// 	if(menu.id === NULL){
	// 		menu.id = 1;
	// 	}
	// });

	Menu.prototype.toWeb = function (pw) {
		let json = this.toJSON();
		return json;
	};
	MenuPage.sync({force: false});
	UserMenu.sync({force: false});
	Menu.sync({force: false});
	return Menu;

}