import { createLogger, format, addColors, transports } from 'winston';
import config from '../config';

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4
};

const level = () => {
    const env = config.NODE_ENV || 'development';
    const isDevelopment = env === 'development';
    return isDevelopment ? 'debug' : 'warn';
};

const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white'
};

addColors(colors);

const winstonFormat = format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    format.colorize({ all: true }),
    format.printf(
        ({ timestamp, level: infoLevel, message }) => `${timestamp} ${infoLevel}: ${message}`,
    )
);

const winstonTransports = [
    new transports.Console(),
    new transports.File({
        filename: 'logs/error.log',
        level: 'error'
    }),
    new transports.File({ filename: 'logs/all.log' })
];

export const logger = createLogger({
    level: level(),
    levels,
    format: winstonFormat,
    transports: winstonTransports,
    exceptionHandlers: [
        new transports.File({ filename: 'logs/exception.log' })
    ],
    rejectionHandlers: [
        new transports.File({ filename: 'logs/rejections.log' })
    ]
    // exitOnError: false
});
