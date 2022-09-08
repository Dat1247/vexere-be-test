"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Seats", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			vehicle_id: {
				type: Sequelize.INTEGER,
				references: {
					model: "Vehicles",
					key: "id",
				},
			},
			ticket_id: {
				type: Sequelize.INTEGER,
				references: {
					model: "Tickets",
					key: "id",
				},
			},
			name: {
				type: Sequelize.STRING,
			},
			status: {
				type: Sequelize.BOOLEAN,
				defaultValue: false,
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
		await queryInterface.dropTable("Seats");
	},
};
