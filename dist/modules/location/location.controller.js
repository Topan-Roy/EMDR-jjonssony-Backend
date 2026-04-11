"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.locationController = void 0;
const location_service_1 = require("./location.service");
const respond = (res, data, status = 200) => res.status(status).json({ success: true, data, meta: { timestamp: new Date().toISOString() } });
exports.locationController = {
    // POST /location
    share: async (req, res, next) => {
        try {
            const data = await location_service_1.locationService.shareLocation(req.user.userId, req.body);
            respond(res, data, 201);
        }
        catch (e) {
            next(e);
        }
    },
    // GET /location
    getMyLocation: async (req, res, next) => {
        try {
            respond(res, await location_service_1.locationService.getMyLocation(req.user.userId));
        }
        catch (e) {
            next(e);
        }
    },
};
//# sourceMappingURL=location.controller.js.map