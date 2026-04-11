"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shareLocationSchema = void 0;
const zod_1 = require("zod");
exports.shareLocationSchema = zod_1.z.object({
    body: zod_1.z.object({
        latitude: zod_1.z
            .number({ required_error: 'Latitude is required' })
            .min(-90, 'Latitude must be between -90 and 90')
            .max(90, 'Latitude must be between -90 and 90'),
        longitude: zod_1.z
            .number({ required_error: 'Longitude is required' })
            .min(-180, 'Longitude must be between -180 and 180')
            .max(180, 'Longitude must be between -180 and 180'),
        accuracy: zod_1.z.number().positive().optional(),
    }),
});
//# sourceMappingURL=location.validation.js.map