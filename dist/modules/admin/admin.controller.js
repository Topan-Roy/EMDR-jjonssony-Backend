"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminController = void 0;
const admin_service_1 = require("./admin.service");
const upload_1 = require("../../middleware/upload");
const ApiError_1 = require("../../utils/ApiError");
const respond = (res, data, status = 200) => res.status(status).json({ success: true, data, meta: { timestamp: new Date().toISOString() } });
exports.adminController = {
    // GET /admin/profile
    getProfile: async (req, res, next) => {
        try {
            respond(res, await admin_service_1.adminService.getProfile(req.user.userId));
        }
        catch (e) {
            next(e);
        }
    },
    // PATCH /admin/profile  — multipart/form-data
    updateProfile: async (req, res, next) => {
        (0, upload_1.uploadProfilePic)(req, res, async (err) => {
            try {
                if (err)
                    return next(err);
                const { name, phoneNumber } = req.body;
                if (!name)
                    return next(ApiError_1.ApiError.validationError('name is required', 'name'));
                const profilePicBuffer = req.file?.buffer;
                const data = await admin_service_1.adminService.updateProfile(req.user.userId, { name, phoneNumber }, profilePicBuffer);
                respond(res, data);
            }
            catch (e) {
                next(e);
            }
        });
    },
};
//# sourceMappingURL=admin.controller.js.map