import { Request, Response, NextFunction } from 'express';
import { logger } from '../logger/logger';

export const reqLogger = (req: Request, _res: Response, next: NextFunction) => {
    const { method, url, query, body } = req;
    logger.info(` Request: ${method} ${url}; query: ${JSON.stringify(query)}; body: ${JSON.stringify(body)}`);
    next();
};
