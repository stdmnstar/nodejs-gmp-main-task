import HttpException from '../common/http-exception';
import { Request, Response, NextFunction } from 'express';

// eslint-disable-next-line no-unused-vars
export const errorHandler = (error: HttpException, _req: Request, res: Response, _next: NextFunction) => {
    const status = error.statusCode || error.status || 400;

    res.status(status).json({ message: error.message });
};
