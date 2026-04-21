import { Response, NextFunction } from 'express';
import { progressService } from './progress.service';
import { AuthRequest } from '../../middleware/authMiddleware';

const ok = (res: Response, data: unknown, status = 200) =>
  res.status(status).json({ success: true, data, meta: { timestamp: new Date().toISOString() } });

export const progressController = {

  updateMediaProgress: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { mediaId } = req.params;
      const { watchedSeconds, totalSeconds } = req.body;
      ok(res, await progressService.updateMediaProgress(req.user!.userId, mediaId, watchedSeconds, totalSeconds));
    } catch (e) { next(e); }
  },

  getCategoryProgress: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      ok(res, await progressService.getCategoryProgress(req.user!.userId, req.params.categoryId));
    } catch (e) { next(e); }
  },

  getJourneyProgress: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      ok(res, await progressService.getJourneyProgress(req.user!.userId, req.params.journeyId));
    } catch (e) { next(e); }
  },
};
