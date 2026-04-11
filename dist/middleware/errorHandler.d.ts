import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { ApiError } from '../utils/ApiError';
export declare const errorHandler: (err: Error | ApiError | ZodError, _req: Request, res: Response, _next: NextFunction) => void;
export declare const notFoundHandler: (req: Request, _res: Response, next: NextFunction) => void;
//# sourceMappingURL=errorHandler.d.ts.map