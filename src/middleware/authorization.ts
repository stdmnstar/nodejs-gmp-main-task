import jsonwebtoken from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import config from '../config';
import HttpException from '../common/http-exception';

export const authorization = (req: Request, _res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        next(new HttpException('Unauthorized', 401));
        return;
    }

    jsonwebtoken.verify(token as string, config.JWT_SECRET as string, (err: any) => {
        if (err) {
            next(new HttpException('Forbidden', 403));
            return;
        }
        next();
    });
};
