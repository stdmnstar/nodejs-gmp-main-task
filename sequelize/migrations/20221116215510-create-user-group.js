// eslint-disable-next-line strict
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('user_groups', {
            userId: {
                type: Sequelize.UUID,
                primaryKey: true,
                references: {
                    model: {
                        tableName: 'users'
                    },
                    key: 'id'
                },
                allowNull: false,
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            groupId: {
                type: Sequelize.UUID,
                primaryKey: true,
                references: {
                    model: {
                        tableName: 'groups'
                    },
                    key: 'id'
                },
                allowNull: false,
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            }
        });
    },
    // eslint-disable-next-line no-unused-vars
    async down(queryInterface, _Sequelize) {
        await queryInterface.dropTable('user_groups');
    }
};
