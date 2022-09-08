"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Vehicle extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ carCompany, Seat, Trip }) {
			// define association here
			this.belongsTo(carCompany, {
				foreignKey: "carCompany_id",
				as: "carCompany",
			});
			this.hasMany(Seat, { foreignKey: "vehicle_id" });
			this.belongsTo(Trip, { foreignKey: "trip_id", as: "trip" });
		}
	}
	Vehicle.init(
		{
			name: DataTypes.STRING,
			typeVehicle: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Vehicle",
		}
	);
	return Vehicle;
};
