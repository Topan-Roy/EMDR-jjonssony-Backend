import { Response, NextFunction } from 'express';
import { cbtFormulationService } from './cbtFormulation.service';
import { AuthRequest } from '../../middleware/authMiddleware';

const ok = (res: Response, data: unknown, status = 200) =>
  res.status(status).json({ success: true, data, meta: { timestamp: new Date().toISOString() } });

export const cbtFormulationController = {

  /* 1️⃣  GET /api/cbt-formulation/options — predefined lists */
  getOptions: async (_req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      ok(res, await cbtFormulationService.getOptions());
    } catch (e) { next(e); }
  },

  /* 2️⃣  POST /api/cbt-formulation — create new formulation */
  create: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      ok(res, await cbtFormulationService.create(req.user!.userId, req.body), 201);
    } catch (e) { next(e); }
  },

  /* 3️⃣  GET /api/cbt-formulation — list all for logged-in user */
  list: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      ok(res, await cbtFormulationService.listByUser(req.user!.userId));
    } catch (e) { next(e); }
  },

  /* 4️⃣  GET /api/cbt-formulation/:id — single formulation */
  getById: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      ok(res, await cbtFormulationService.getById(req.params.id, req.user!.userId));
    } catch (e) { next(e); }
  },

  /* 5️⃣  PUT /api/cbt-formulation/:id — full update */
  update: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      ok(res, await cbtFormulationService.update(req.params.id, req.user!.userId, req.body));
    } catch (e) { next(e); }
  },

  /* 6️⃣  PATCH /api/cbt-formulation/:id/section — auto-save one section */
  patchSection: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { section, value } = req.body;
      ok(res, await cbtFormulationService.patchSection(req.params.id, req.user!.userId, section, value));
    } catch (e) { next(e); }
  },

  /* 7️⃣  DELETE /api/cbt-formulation/:id — remove formulation */
  delete: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      ok(res, await cbtFormulationService.delete(req.params.id, req.user!.userId));
    } catch (e) { next(e); }
  },
};
