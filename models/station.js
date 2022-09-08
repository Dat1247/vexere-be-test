"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Station extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ Trip }) {
			// define association here
			this.hasMany(Trip, { foreignKey: "fromStation", as: "from" });
			this.hasMany(Trip, { foreignKey: "toStation", as: "to" });
		}
	}
	Station.init(
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
			address: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			province: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "Station",
		}
	);
	return Station;
};
