// eslint-disable-next-line strict
'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        // eslint-disable-next-line no-unused-vars
        static associate(_models) {
            // define association here
        }
    }
    User.init({
        login: DataTypes.STRING,
        password: DataTypes.STRING,
        age: DataTypes.INTEGER,
        isDeleted: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'user'
    });
    return User;
};
