import Joi from 'joi';

export const errorResponse = (schemaErrors: Array<Joi.ValidationErrorItem>) => {
    const errors = schemaErrors.map((err) => {
        const { path, message } = err;
        return { path, message };
    });
    return {
        status: 'failed',
        errors
    };
};
