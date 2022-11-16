// eslint-disable-next-line strict
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('groups', {
            id: {
                type: Sequelize.UUID,
                primaryKey: true,
                allowNull: false,
                defaultValue: Sequelize.UUIDV4
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            permissions: {
                allowNull: false,
                type: Sequelize.ARRAY(Sequelize.ENUM('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'))
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
        await queryInterface.dropTable('groups');
    }
};
