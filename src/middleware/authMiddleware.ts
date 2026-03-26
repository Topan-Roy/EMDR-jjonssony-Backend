import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { ApiError } from '../utils/ApiError';
import { User } from '../modules/auth/auth.model';

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    role: string;
    isVerified: boolean;
  };
}

export const authenticate = async (req: AuthRequest, _res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw ApiError.unauthorized('No token provided');
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);

    // Block soft-deleted accounts
    const user = await User.findOne({ _id: decoded.userId, isDeleted: false }).select('_id');
    if (!user) {
      throw ApiError.unauthorized('Account no longer exists');
    }

    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};
