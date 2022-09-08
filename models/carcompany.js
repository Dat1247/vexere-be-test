"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class carCompany extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ Vehicle }) {
			// define association here

			this.hasMany(Vehicle, { foreignKey: "carCompany_id", as: "carCompany" });
		}
	}
	carCompany.init(
		{
			name: DataTypes.STRING,
			image: DataTypes.STRING,
			description: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "carCompany",
		}
	);
	return carCompany;
};
