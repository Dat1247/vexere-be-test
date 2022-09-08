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
            "stations", [{
                    name: "Bến xe miền Tây",
                    address: "395 Kinh Dương Vương, An Lạc, Bình Tân, Thành phố Hồ Chí Minh",
                    province: "HCM",
                    createdAt: "2022-05-09 08:48:23",
                    updatedAt: "2022-05-09 08:48:23",
                },
                {
                    name: "Bến xe Châu Đốc",
                    address: "QL91, Vĩnh Mỹ, Châu Đốc, Châu Phú B",
                    province: "AG",
                    createdAt: "2022-05-09 08:58:10",
                    updatedAt: "2022-05-09 09:23:06",
                },
                {
                    name: "Bến xe Long Xuyên",
                    address: "392, P.Phạm Cự Tượng, Tp. Long Xuyên, An Giang",
                    province: "AG",
                    createdAt: "2022-05-09 09:40:28",
                    updatedAt: "2022-05-09 09:40:28",
                },
                {
                    name: "Bến xe Đà Nẵng",
                    address: "Tôn Đức Thắng, Hoà Minh, Liên Chiểu, Đà Nẵng",
                    province: "DN",
                    createdAt: "2022-05-10 03:19:25",
                    updatedAt: "2022-05-10 03:19:25",
                },
                {
                    name: "Bến Xe Cần Thơ Mới",
                    address: "Hưng Thành, Cái Răng, Cần Thơ",
                    province: "CT",
                    createdAt: "2022-05-10 03:19:25",
                    updatedAt: "2022-05-10 03:19:25",
                },
                {
                    name: "Bến Xe Trung Tâm Cần Thơ",
                    address: "2Q4F+74R, Đường dẫn cầu Cần Thơ, QL1A, Hưng Thành, Cái Răng, Cần Thơ",
                    province: "CT",
                    createdAt: "2022-05-10 03:19:25",
                    updatedAt: "2022-05-10 03:19:25",
                },
            ], {}
        );
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete("stations", null, {});
    },
};