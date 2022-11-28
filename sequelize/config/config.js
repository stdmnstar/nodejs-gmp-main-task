
require('dotenv').config();

module.exports = {
    development: {
        dialect: 'postgres',
        username: process.env.POSTGRES_USER_NAME,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DATABASE,
        host: process.env.POSTGRES_HOST
    },
    test: {
        username: 'postgres',
        password: 'postgres',
        database: process.env.POSTGRES_TEST_DATABASE,
        host: process.env.POSTGRES_HOST,
        dialect: 'postgres'
    },
    production: {
        dialect: 'postgres',
        username: process.env.POSTGRES_USER_NAME,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DATABASE,
        host: process.env.POSTGRES_HOST
    }
};
