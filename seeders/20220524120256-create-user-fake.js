"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   "name": 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
		await queryInterface.bulkInsert(
			"users",
			[
				{
					name: "Nguyễn Văn A",
					email: "nva@gmail.com",
					password:
						"$2a$10$YEXBT/pa6bJpGw30Us8OVOm/o9TYf.RfaC6suwAygUSpZVNBfoUdu",
					numberPhone: "1234567890",
					avatar: "",
					type: "ADMIN",
					createdAt: "2022-05-12 08:05:14",
					updatedAt: "2022-05-12 08:05:14",
				},
				{
					name: "Nguyễn Văn B",
					email: "nvb@gmail.com",
					password:
						"$2a$10$m4B6PrAB3.eKxguvMDGqnucmCuES/jV3Qe0aKYTcxLltW1xW.UuMC",
					numberPhone: "1234567890",
					avatar:
						"http://localhost:3000/public/images/avatar/1652343360685_shen.jpg",
					type: "CLIENT",
					createdAt: "2022-05-12 08:05:21",
					updatedAt: "2022-05-12 08:16:00",
				},
				{
					name: "Nguyễn Văn C",
					email: "nvc@gmail.com",
					password:
						"$2a$10$OZqeN/gGdFcG554lYPr1YeYyJwhSy2.CyQxx4jIOH/JrtJmFp9At.",
					numberPhone: "1234567890",
					avatar:
						"https://gravatar.com/avatar/85b92307df5fca6cc0579994e545fec1",
					type: "CLIENT",
					createdAt: "2022-05-12 08:30:43",
					updatedAt: "2022-05-12 08:30:43",
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
		await queryInterface.bulkDelete("users", null, {});
	},
};
