export declare class ApiError extends Error {
    statusCode: number;
    code: string;
    field?: string;
    isOperational: boolean;
    constructor(statusCode: number, code: string, message: string, field?: string, isOperational?: boolean);
    static validationError(message: string, field?: string): ApiError;
    static emailAlreadyExists(): ApiError;
    static otpExpired(): ApiError;
    static otpInvalid(): ApiError;
    static otpAttemptsExceeded(): ApiError;
    static userNotFound(): ApiError;
    static unauthorized(message?: string): ApiError;
    static internalError(message?: string): ApiError;
    static tooManyRequests(message?: string): ApiError;
    static forbidden(message?: string): ApiError;
    static notFound(message?: string): ApiError;
}
//# sourceMappingURL=ApiError.d.ts.map