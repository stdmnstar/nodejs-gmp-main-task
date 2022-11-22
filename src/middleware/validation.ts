import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { logger } from '../logger/logger';
import { getErrorMessage } from '../utils/utils';
import { errorResponse } from '../validation/error-mapping';

export const validateSchema = (schema: Joi.AnySchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body, {
            abortEarly: false,
            allowUnknown: false
        });

        if (error?.isJoi) {
            const { method, url, body } = req;
            logger.error(` Request: ${method} ${url}; request body: ${JSON.stringify(body)}; ValidationError: ${getErrorMessage(error)}`);
            return res.status(400).json(errorResponse(error.details));
        }

        next();
    };
};
