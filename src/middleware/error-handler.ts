import HttpException from '../common/http-exception';
import { Request, Response, NextFunction } from 'express';
import { logger } from '../logger/logger';

// eslint-disable-next-line no-unused-vars
export const errorHandler = (error: HttpException, req: Request, res: Response, _next: NextFunction) => {
    const { statusCode, status, controllerMethod, message } = error;
    const { method, url, query, body } = req;

    const resStatus = statusCode || status || 500;
    const controllerMethodMessage = controllerMethod ? ` Controller method: ${controllerMethod};` : '';

    logger.error(
        `${controllerMethodMessage} Request: ${method} ${url}; query: ${JSON.stringify(query)}; body: ${JSON.stringify(body)}; error: ${message}`
    );
    res.status(resStatus).json({ message });
};
