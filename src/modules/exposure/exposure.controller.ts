import { Response, NextFunction } from 'express';
import { exposureService } from './exposure.service';
import { AuthRequest } from '../../middleware/authMiddleware';

const ok = (res: Response, data: unknown, status = 200) =>
  res.status(status).json({ success: true, data, meta: { timestamp: new Date().toISOString() } });

export const exposureController = {

  /* 1️⃣  GET /api/exposure/behaviors */
  getBehaviors: async (_req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      ok(res, await exposureService.getBehaviors());
    } catch (e) { next(e); }
  },

  /* 2️⃣  POST /api/exposure/plan */
  createPlan: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      ok(res, await exposureService.createPlan(req.user!.userId, req.body), 201);
    } catch (e) { next(e); }
  },

  /* 3️⃣  GET /api/exposure/plan/:id */
  getPlan: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      ok(res, await exposureService.getPlanById(req.params.id, req.user!.userId));
    } catch (e) { next(e); }
  },

  /* GET /api/exposure/plans  (all plans for logged-in user) */
  getUserPlans: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      ok(res, await exposureService.getUserPlans(req.user!.userId));
    } catch (e) { next(e); }
  },

  /* 4️⃣  PATCH /api/exposure/plan/:id/step */
  updateStep: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      ok(res, await exposureService.updateStep(req.params.id, req.user!.userId, req.body));
    } catch (e) { next(e); }
  },

  /* 5️⃣  GET /api/exposure/plan/:id/progress */
  getProgress: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      ok(res, await exposureService.getProgress(req.params.id, req.user!.userId));
    } catch (e) { next(e); }
  },

  /* DELETE /api/exposure/plan/:id */
  deletePlan: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      ok(res, await exposureService.deletePlan(req.params.id, req.user!.userId));
    } catch (e) { next(e); }
  },

  /* 6️⃣  GET /api/exposure/plan/:id/weekly-review */
  getWeeklyReview: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      ok(res, await exposureService.getWeeklyReview(req.params.id, req.user!.userId));
    } catch (e) { next(e); }
  },

  /* 7️⃣  GET /api/exposure/plan/:id/weekly-review/history */
  getWeeklyReviewHistory: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      ok(res, await exposureService.getWeeklyReviewHistory(req.params.id, req.user!.userId));
    } catch (e) { next(e); }
  },

  /* 8️⃣  POST /api/exposure/plan/:id/weekly-review */
  saveWeeklyReview: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      ok(res, await exposureService.saveWeeklyReview(req.params.id, req.user!.userId, req.body));
    } catch (e) { next(e); }
  },
};
