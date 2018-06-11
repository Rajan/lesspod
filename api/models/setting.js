'use strict';
module.exports = (sequelize, DataTypes) => {

	var Setting = sequelize.define('Setting', {
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4
		},
		name: { type: DataTypes.STRING, allowNull: false },
		value: { type: DataTypes.STRING, allowNull: true },
		default: { type: DataTypes.STRING, allowNull: true }
	});

	Setting.prototype.toWeb = function (pw) {
		let json = this.toJSON();
		return json;
	};
	Setting.sync({force: false});
	return Setting;
};