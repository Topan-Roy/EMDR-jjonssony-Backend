import { Request } from 'express';

export interface IUser {
  _id?: string;
  email: string;
  password: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

import { JWTPayload } from '../utils/jwt';

export interface AuthRequest extends Request {
  user?: JWTPayload;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}
