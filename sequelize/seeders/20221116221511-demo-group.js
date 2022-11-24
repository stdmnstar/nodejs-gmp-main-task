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
            'groups',
            [
                {
                    id: '93bb7c84-e725-40db-babd-b8e995d11c09',
                    name: 'string1',
                    permissions: '{READ}'
                },
                {
                    id: '9208ede9-e5f8-4937-86fe-a99fe7f65935',
                    name: 'string2',
                    permissions: '{READ,WRITE,DELETE,SHARE,UPLOAD_FILES}'
                },
                {
                    id: '53931d71-ecfb-4d62-b9fa-9586f2430955',
                    name: 'string3',
                    permissions: '{WRITE}'
                },
                {
                    id: 'a46a5106-8b12-47dd-b15b-e358988996c0',
                    name: 'string4',
                    permissions: '{SHARE,UPLOAD_FILES}'
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
