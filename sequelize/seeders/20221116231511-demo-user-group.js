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
            'user_groups',
            [
                {
                    userId: '8696e982-e93d-4c40-abda-991ed5917616',
                    groupId: '93bb7c84-e725-40db-babd-b8e995d11c09'
                },
                {
                    userId: 'c8c0e29d-f66c-4417-af3e-5b8373f9b486',
                    groupId: '9208ede9-e5f8-4937-86fe-a99fe7f65935'
                },
                {
                    userId: 'a5da64a3-38df-4bf1-896a-3cada23e88fc',
                    groupId: '9208ede9-e5f8-4937-86fe-a99fe7f65935'
                },
                {
                    userId: 'cc7d4bb4-18f0-430a-8de3-f152222763e6',
                    groupId: '53931d71-ecfb-4d62-b9fa-9586f2430955'
                },
                {
                    userId: '775dc1c5-5ff6-4a3b-9866-ac4d3c876e2f',
                    groupId: '53931d71-ecfb-4d62-b9fa-9586f2430955'
                },
                {
                    userId: 'f0df588e-c4af-4457-8ffe-7365e8764a78',
                    groupId: '53931d71-ecfb-4d62-b9fa-9586f2430955'
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
