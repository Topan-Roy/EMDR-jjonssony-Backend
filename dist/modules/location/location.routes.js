"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const location_controller_1 = require("./location.controller");
const authMiddleware_1 = require("../../middleware/authMiddleware");
const validate_1 = require("../../middleware/validate");
const location_validation_1 = require("./location.validation");
const router = (0, express_1.Router)();
router.use(authMiddleware_1.authenticate);
/**
 * @swagger
 * tags:
 *   name: Location
 *   description: User Geolocation Services
 */
/**
 * @swagger
 * /api/location:
 *   post:
 *     summary: Share/Update current location
 *     tags: [Location]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [latitude, longitude]
 *             properties:
 *               latitude: { type: number, example: 23.8103 }
 *               longitude: { type: number, example: 90.4125 }
 *               accuracy: { type: number, example: 15.5 }
 *     responses:
 *       200:
 *         description: Location updated
 */
router.post('/', (0, validate_1.validate)(location_validation_1.shareLocationSchema), location_controller_1.locationController.share);
/**
 * @swagger
 * /api/location:
 *   get:
 *     summary: Get my last shared location
 *     tags: [Location]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Last known location retrieved
 */
router.get('/', location_controller_1.locationController.getMyLocation);
exports.default = router;
//# sourceMappingURL=location.routes.js.map