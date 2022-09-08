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
			"carcompanies",
			[
				{
					name: "Nhà xe Phương Trang",
					image: "./public/images/company/1653559250728_varus 3.jpg",
					description: "Nhà xe PT",

					createdAt: "2022-05-26 10:00:50",
					updatedAt: "2022-05-26 10:01:54",
				},
				{
					name: "Nhà xe Thành Bưởi",
					image: "./public/images/company/1653559343558_shen 2.jpg",
					description: "Nhà xe TB",

					createdAt: "2022-05-26 10:00:56",
					updatedAt: "2022-05-26 10:02:23",
				},
				{
					name: "Nhà xe Mai Linh",
					image: "./public/images/company/1653559343558_shen 2.jpg",
					description: "Nhà xe ML",
					createdAt: "2022-05-26 10:00:56",
					updatedAt: "2022-05-26 10:02:23",
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
	},
};
