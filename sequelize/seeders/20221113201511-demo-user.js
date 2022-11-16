/* eslint-disable no-unused-vars */
// eslint-disable-next-line strict
'use strict';

/** @type {import('sequelize-cli').Migration} */
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
        return queryInterface.bulkInsert(
            'users',
            [
                {
                    id: '8696e982-e93d-4c40-abda-991ed5917616',
                    login: 'Alex Min',
                    password: 'qwerty123456',
                    age: 33,
                    isDeleted: false
                },
                {
                    id: 'c8c0e29d-f66c-4417-af3e-5b8373f9b486',
                    login: 'Max Min',
                    password: 'qwerty123456',
                    age: 44,
                    isDeleted: false
                },
                {
                    id: 'a5da64a3-38df-4bf1-896a-3cada23e88fc',
                    login: 'Nim Min',
                    password: 'qwerty123456',
                    age: 28,
                    isDeleted: false
                },
                {
                    id: 'cc7d4bb4-18f0-430a-8de3-f152222763e6',
                    login: 'Kim Kim',
                    password: 'qwerty123456',
                    age: 25,
                    isDeleted: false
                },
                {
                    id: '775dc1c5-5ff6-4a3b-9866-ac4d3c876e2f',
                    login: 'Login1',
                    password: 'qwerty123456',
                    age: 75,
                    isDeleted: false
                },
                {
                    id: 'f0df588e-c4af-4457-8ffe-7365e8764a78',
                    login: 'Login2',
                    password: 'qwerty123456',
                    age: 36,
                    isDeleted: false
                }
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
    }
};
