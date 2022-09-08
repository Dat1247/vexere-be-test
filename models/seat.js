"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Seat extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ Vehicle, Ticket }) {
            // define association here
            this.belongsTo(Vehicle, { foreignKey: "vehicle_id" });
            this.belongsTo(Ticket, { foreignKey: "ticket_id" });
        }
    }
    Seat.init({
        name: DataTypes.STRING,
        status: DataTypes.BOOLEAN,
    }, {
        sequelize,
        modelName: "Seat",
    });
    return Seat;
};