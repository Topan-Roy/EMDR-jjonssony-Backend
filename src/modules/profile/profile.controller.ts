import { Response, NextFunction } from 'express';
import { profileService } from './profile.service';
import { AuthRequest } from '../../middleware/authMiddleware';

export class ProfileController {
  // GET /profile
  async getProfile(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.userId;
      const data = await profileService.getProfile(userId);
      res.status(200).json({ success: true, data, meta: { timestamp: new Date().toISOString() } });
    } catch (error) {
      next(error);
    }
  }

  // PATCH /profile
  async updateProfile(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.userId;
      const { fullName, phoneNumber } = req.body;
      const data = await profileService.updateProfile(userId, fullName, phoneNumber);
      res.status(200).json({ success: true, data, meta: { timestamp: new Date().toISOString() } });
    } catch (error) {
      next(error);
    }
  }

  // DELETE /profile
  async deleteAccount(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.userId;
      const data = await profileService.deleteAccount(userId);
      res.status(200).json({ success: true, data, meta: { timestamp: new Date().toISOString() } });
    } catch (error) {
      next(error);
    }
  }
}

export const profileController = new ProfileController();
