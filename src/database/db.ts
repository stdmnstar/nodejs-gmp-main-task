import { Sequelize } from 'sequelize';
import config from '../config';

export const db = new Sequelize({
    logging: false,
    database: config.POSTGRES_DATABASE,
    username: config.POSTGRES_USER_NAME,
    password: config.POSTGRES_PASSWORD,
    host: config.POSTGRES_HOST,
    port: (config.POSTGRES_PORT as number | undefined),
    dialect: 'postgres'
});
