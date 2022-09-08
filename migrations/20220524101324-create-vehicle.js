"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Vehicles", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			carCompany_id: {
				type: Sequelize.INTEGER,
				references: {
					model: "carcompanies",
					key: "id",
				},
			},
			name: {
				type: Sequelize.STRING,
			},

			typeVehicle: {
				type: Sequelize.STRING,
			},
			trip_id: {
				type: Sequelize.INTEGER,
				references: {
					model: "trips",
					key: "id",
				},
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Vehicles");
	},
};
