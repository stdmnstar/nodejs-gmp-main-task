import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
    path: path.join(__dirname, '../.env')
});

export default {
    NODE_ENV: process.env['NODE_ENV'],
    PORT: process.env['PORT'],
    POSTGRES_DATABASE: process.env['POSTGRES_DATABASE'],
    POSTGRES_USER_NAME: process.env['POSTGRES_USER_NAME'],
    POSTGRES_PASSWORD: process.env['POSTGRES_PASSWORD'],
    POSTGRES_HOST: process.env['POSTGRES_HOST'],
    POSTGRES_PORT: process.env['POSTGRES_PORT']
};
