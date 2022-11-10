import HttpException from '../common/http-exception';
import { Request, Response } from 'express';

export const errorHandler = (error: HttpException, _req: Request, res: Response) => {
    const status = error.statusCode || error.status || 500;

    res.status(status).json({ message: error.message });
};
