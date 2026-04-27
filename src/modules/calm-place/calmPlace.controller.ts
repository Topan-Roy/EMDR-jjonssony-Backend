import { Response, NextFunction } from 'express';
import { calmPlaceService } from './calmPlace.service';
import { AuthRequest } from '../../middleware/authMiddleware';

const ok = (res: Response, data: unknown, status = 200) =>
  res.status(status).json({ success: true, data, meta: { timestamp: new Date().toISOString() } });

export const calmPlaceController = {
  save: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const files = req.files as { image?: Express.Multer.File[], sound?: Express.Multer.File[] };
      const data = {
        describe: req.body.describe,
        image: req.body.image,
        soundLink: req.body.soundLink
      };
      const result = await calmPlaceService.save(req.user!.userId, data, files);
      ok(res, result, 201);
    } catch (e) { next(e); }
  },

  get: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const result = await calmPlaceService.get(req.user!.userId);
      ok(res, result);
    } catch (e) { next(e); }
  },

  delete: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const result = await calmPlaceService.delete(req.params.id, req.user!.userId);
      ok(res, result);
    } catch (e) { next(e); }
  }
};
