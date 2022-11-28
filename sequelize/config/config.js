
require('dotenv').config();

module.exports = {
    development: {
        dialect: 'postgres',
        username: process.env.POSTGRES_USER_NAME,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DATABASE,
        host: process.env.POSTGRES_HOST
    },
    production: {
        dialect: 'postgres',
        username: process.env.POSTGRES_USER_NAME,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DATABASE,
        host: process.env.POSTGRES_HOST
    }
};
