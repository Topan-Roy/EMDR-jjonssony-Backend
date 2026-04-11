"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileController = exports.ProfileController = void 0;
const profile_service_1 = require("./profile.service");
const upload_1 = require("../../middleware/upload");
const ApiError_1 = require("../../utils/ApiError");
class ProfileController {
    // GET /profile
    async getProfile(req, res, next) {
        try {
            const userId = req.user.userId;
            const data = await profile_service_1.profileService.getProfile(userId);
            res.status(200).json({ success: true, data, meta: { timestamp: new Date().toISOString() } });
        }
        catch (error) {
            next(error);
        }
    }
    // PATCH /profile
    async updateProfile(req, res, next) {
        (0, upload_1.uploadProfilePic)(req, res, async (err) => {
            try {
                if (err)
                    return next(err);
                const userId = req.user.userId;
                const { fullName, phoneNumber } = req.body;
                if (!fullName) {
                    return next(ApiError_1.ApiError.validationError('fullName is required', 'fullName'));
                }
                const profilePicBuffer = req.file?.buffer;
                const data = await profile_service_1.profileService.updateProfile(userId, fullName, phoneNumber, profilePicBuffer);
                res.status(200).json({ success: true, data, meta: { timestamp: new Date().toISOString() } });
            }
            catch (error) {
                next(error);
            }
        });
    }
    // DELETE /profile
    async deleteAccount(req, res, next) {
        try {
            const userId = req.user.userId;
            const data = await profile_service_1.profileService.deleteAccount(userId);
            res.status(200).json({ success: true, data, meta: { timestamp: new Date().toISOString() } });
        }
        catch (error) {
            next(error);
        }
    }
    // PATCH /profile/change-password
    async changePassword(req, res, next) {
        try {
            const userId = req.user.userId;
            const { currentPassword, newPassword } = req.body;
            const data = await profile_service_1.profileService.changePassword(userId, currentPassword, newPassword);
            res.status(200).json({ success: true, data, meta: { timestamp: new Date().toISOString() } });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.ProfileController = ProfileController;
exports.profileController = new ProfileController();
//# sourceMappingURL=profile.controller.js.map