import { Response, NextFunction } from 'express';
import { myTestsService } from './myTests.service';
import { AuthRequest } from '../../middleware/authMiddleware';
import { DayOfWeek } from './myTests.model';
import { upload } from '../../middleware/upload';
import { ApiError } from '../../utils/ApiError';

// ─────────────────────────────────────────────────────────────────────────────
// RESPONSE HELPER
// ─────────────────────────────────────────────────────────────────────────────

const ok = (res: Response, data: unknown, status = 200): void => {
  res.status(status).json({
    success: true,
    data,
    meta: { timestamp: new Date().toISOString() },
  });
};

// ─────────────────────────────────────────────────────────────────────────────
// CONTROLLER
// ─────────────────────────────────────────────────────────────────────────────

export const myTestsController = {
  // ═══════════════════════════════════════════════════════════════════════════
  // CATEGORY ENDPOINTS
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * POST /api/my-tests/categories
   * Create a new test category
   */
  createCategory: async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const category = await myTestsService.createCategory(req.user!.userId, req.body);
      ok(res, category, 201);
    } catch (e) {
      next(e);
    }
  },

  /**
   * GET /api/my-tests/categories
   * List all categories for the authenticated user
   */
  listCategories: async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const page = Math.max(1, parseInt(req.query.page as string) || 1);
      const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string) || 20));
      const isActive =
        req.query.isActive === 'true'
          ? true
          : req.query.isActive === 'false'
          ? false
          : undefined;

      const result = await myTestsService.getUserCategories(
        req.user!.userId,
        page,
        limit,
        isActive
      );
      ok(res, result);
    } catch (e) {
      next(e);
    }
  },

  /**
   * GET /api/my-tests/categories/:id
   * Get a single category by ID
   */
  getCategory: async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const category = await myTestsService.getCategoryById(req.params.id, req.user!.userId);
      ok(res, category);
    } catch (e) {
      next(e);
    }
  },

  /**
   * PATCH /api/my-tests/categories/:id
   * Update a category
   */
  updateCategory: async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const category = await myTestsService.updateCategory(
        req.params.id,
        req.user!.userId,
        req.body
      );
      ok(res, category);
    } catch (e) {
      next(e);
    }
  },

  /**
   * DELETE /api/my-tests/categories/:id
   * Delete a category and all its items
   */
  deleteCategory: async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await myTestsService.deleteCategory(req.params.id, req.user!.userId);
      ok(res, result);
    } catch (e) {
      next(e);
    }
  },

  /**
   * GET /api/my-tests/categories/:id/stats
   * Get category statistics
   */
  getCategoryStats: async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const stats = await myTestsService.getCategoryStats(req.params.id, req.user!.userId);
      ok(res, stats);
    } catch (e) {
      next(e);
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ITEM ENDPOINTS
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * POST /api/my-tests/categories/:categoryId/items
   * Create a new item in a category — supports optional image upload (form-data)
   */
  createItem: async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    upload.single('image')(req as any, res, async (err) => {
      try {
        if (err) return next(err);

        // Validate required fields after multer has parsed the form-data
        const itemName = req.body.itemName?.trim();
        if (!itemName) {
          return next(ApiError.validationError('Item name is required', 'itemName'));
        }

        const imageBuffer = (req as any).file?.buffer;

        const item = await myTestsService.createItem(
          req.params.categoryId,
          req.user!.userId,
          {
            itemName,
            day        : req.body.day,
            description: req.body.description ?? null,
            imageBuffer,
          }
        );
        ok(res, item, 201);
      } catch (e) {
        next(e);
      }
    });
  },

  /**
   * GET /api/my-tests/categories/:categoryId/items
   * List all items in a category
   */
  listCategoryItems: async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const page = Math.max(1, parseInt(req.query.page as string) || 1);
      const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string) || 50));
      const day = req.query.day as DayOfWeek | undefined;
      const isActive =
        req.query.isActive === 'true'
          ? true
          : req.query.isActive === 'false'
          ? false
          : undefined;

      const result = await myTestsService.getCategoryItems(
        req.params.categoryId,
        req.user!.userId,
        page,
        limit,
        day,
        isActive
      );
      ok(res, result);
    } catch (e) {
      next(e);
    }
  },

  /**
   * GET /api/my-tests/items
   * List all items for the user (across all categories)
   */
  listAllItems: async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const page  = Math.max(1, parseInt(req.query.page  as string) || 1);
      const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string) || 50));
      const day   = req.query.day as DayOfWeek | undefined;

      const result = await myTestsService.getAllUserItems(req.user!.userId, page, limit, day);
      ok(res, result);
    } catch (e) {
      next(e);
    }
  },

  /**
   * PATCH /api/my-tests/admin/items/make-global
   * Admin — bulk mark items as global (migration for existing items)
   */
  makeItemsGlobal: async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { itemIds } = req.body; // optional array of IDs; empty = all items
      const result = await myTestsService.makeItemsGlobal(itemIds);
      ok(res, result);
    } catch (e) {
      next(e);
    }
  },

  /**
   * GET /api/my-tests/admin/items
   * Admin — list ALL items across all users (for dashboard/chart)
   */
  listAllItemsAdmin: async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const page  = Math.max(1, parseInt(req.query.page  as string) || 1);
      const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string) || 50));
      const day   = req.query.day as DayOfWeek | undefined;

      const result = await myTestsService.getAllItemsAdmin(page, limit, day);
      ok(res, result);
    } catch (e) {
      next(e);
    }
  },

  /**
   * POST /api/my-tests/admin/categories/:categoryId/items
   * Admin — create a global item visible to all users
   */
  createGlobalItem: async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    upload.single('image')(req as any, res, async (err) => {
      try {
        if (err) return next(err);

        const itemName = req.body.itemName?.trim();
        if (!itemName) {
          return next(ApiError.validationError('Item name is required', 'itemName'));
        }

        const imageBuffer = (req as any).file?.buffer;

        const item = await myTestsService.createGlobalItem(
          req.user!.userId,
          req.params.categoryId,
          {
            itemName,
            day        : req.body.day,
            description: req.body.description ?? null,
            imageBuffer,
          }
        );
        ok(res, item, 201);
      } catch (e) {
        next(e);
      }
    });
  },

  /**
   * GET /api/my-tests/items/:id
   * Get a single item by ID
   */
  getItem: async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const item = await myTestsService.getItemById(req.params.id, req.user!.userId);
      ok(res, item);
    } catch (e) {
      next(e);
    }
  },

  /**
   * PATCH /api/my-tests/items/:id
   * Update an item — supports optional image upload/removal (form-data)
   */
  updateItem: async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    upload.single('image')(req as any, res, async (err) => {
      try {
        if (err) return next(err);

        const imageBuffer  = (req as any).file?.buffer;
        const removeImage  = req.body.removeImage === 'true' || req.body.removeImage === true;

        const item = await myTestsService.updateItem(req.params.id, req.user!.userId, {
          itemName   : req.body.itemName,
          day        : req.body.day,
          description: req.body.description,
          isActive   : req.body.isActive !== undefined
            ? req.body.isActive === 'true' || req.body.isActive === true
            : undefined,
          imageBuffer,
          removeImage,
        });
        ok(res, item);
      } catch (e) {
        next(e);
      }
    });
  },

  /**
   * DELETE /api/my-tests/items/:id
   * Delete an item
   */
  deleteItem: async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await myTestsService.deleteItem(req.params.id, req.user!.userId);
      ok(res, result);
    } catch (e) {
      next(e);
    }
  },
};

