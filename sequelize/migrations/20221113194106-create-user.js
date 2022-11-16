// eslint-disable-next-line strict
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('users', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4
            },
            login: {
                type: Sequelize.STRING,
                unique: true,
                allowNull: false
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false
            },
            age: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            isDeleted: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
                allowNull: false
            }
            // createdAt: {
            //     allowNull: false,
            //     type: Sequelize.DATE
            // },
            // updatedAt: {
            //     allowNull: false,
            //     type: Sequelize.DATE
            // }
        });
    },
    // eslint-disable-next-line no-unused-vars
    async down(queryInterface, _Sequelize) {
        await queryInterface.dropTable('users');
    }
};
