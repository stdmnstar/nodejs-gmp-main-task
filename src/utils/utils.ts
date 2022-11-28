import HttpException from '../common/http-exception';

export const getErrorMessage = (error: unknown) => {
    if (error instanceof Error) return error.message;
    return String(error);
};

export const getErrorStatusCode = (error: unknown) => {
    if (error instanceof HttpException) return error.statusCode;
    return null;
};
