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
                    login: 'Alex Min',
                    password: 'qwerty123456',
                    age: 33,
                    isDeleted: false
                },
                {
                    login: 'Max Min',
                    password: 'qwerty123456',
                    age: 44,
                    isDeleted: false
                },
                {
                    login: 'Nim Min',
                    password: 'qwerty123456',
                    age: 28,
                    isDeleted: false
                },
                {
                    login: 'Kim Kim',
                    password: 'qwerty123456',
                    age: 25,
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
