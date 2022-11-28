export default class HttpException extends Error {
    statusCode?: number | null;
    status?: number;
    message: string;
    error?: string | null;
    controllerMethod?: string;

    constructor(message: string, statusCode?: number | null, controllerMethod?: string, error?: string) {
        super(message);

        this.statusCode = statusCode;
        this.message = message;
        this.controllerMethod = controllerMethod;
        this.error = error || null;
    }
}
