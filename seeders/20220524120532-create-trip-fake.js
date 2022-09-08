"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
		await queryInterface.bulkInsert(
			"Trips",
			[
				{
					fromStation: 1,
					toStation: 2,
					startTime: "2022-06-01 01:00:00",
					price: 150000,
					createdAt: "2022-05-13 04:17:49",
					updatedAt: "2022-05-13 04:17:49",
				},
				{
					fromStation: 3,
					toStation: 6,
					startTime: "2022-06-01 05:30:00",
					price: 150000,
					createdAt: "2022-05-13 04:28:26",
					updatedAt: "2022-05-13 05:11:37",
				},
				{
					fromStation: 3,
					toStation: 1,
					startTime: "2022-06-01 18:30:00",
					price: 130000,
					createdAt: "2022-05-13 05:14:10",
					updatedAt: "2022-05-13 05:16:43",
				},
				{
					fromStation: 1,
					toStation: 6,
					startTime: "2022-06-01 18:25:00",
					price: 150000,
					createdAt: "2022-05-13 05:19:59",
					updatedAt: "2022-05-13 05:19:59",
				},
				{
					fromStation: 1,
					toStation: 6,
					startTime: "2022-06-01 18:50:00",
					price: 150000,
					createdAt: "2022-05-13 05:19:59",
					updatedAt: "2022-05-13 05:19:59",
				},
				{
					fromStation: 6,
					toStation: 1,
					startTime: "2022-06-02 18:25:00",
					price: 150000,
					createdAt: "2022-05-13 05:19:59",
					updatedAt: "2022-05-13 05:19:59",
				},
				{
					fromStation: 4,
					toStation: 6,
					startTime: "2022-06-02 20:00:00",
					price: 175000,
					createdAt: "2022-05-13 05:19:59",
					updatedAt: "2022-05-13 05:19:59",
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		await queryInterface.bulkDelete("trips", null, {});
	},
};
