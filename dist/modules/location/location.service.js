"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.locationService = void 0;
const location_model_1 = require("./location.model");
const ApiError_1 = require("../../utils/ApiError");
const logger_1 = require("../../config/logger");
// Free reverse geocoding — no API key needed
async function reverseGeocode(lat, lng) {
    try {
        const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`;
        const res = await fetch(url, {
            headers: { 'User-Agent': 'MY-EMDR-App/1.0' },
        });
        if (!res.ok)
            return null;
        const data = await res.json();
        return data.display_name ?? null;
    }
    catch {
        logger_1.logger.warn('Reverse geocoding failed', { lat, lng });
        return null;
    }
}
exports.locationService = {
    // POST — save user's current location (lat/lng only)
    async shareLocation(userId, data) {
        const location = await location_model_1.Location.create({
            userId,
            latitude: data.latitude,
            longitude: data.longitude,
            accuracy: data.accuracy,
            sharedAt: new Date(),
        });
        logger_1.logger.info('Location shared', { userId, lat: data.latitude, lng: data.longitude });
        return {
            id: location._id.toString(),
            latitude: location.latitude,
            longitude: location.longitude,
            accuracy: location.accuracy ?? null,
            sharedAt: location.sharedAt,
        };
    },
    // GET — latest location + auto reverse geocode address
    async getMyLocation(userId) {
        const location = await location_model_1.Location.findOne({ userId })
            .sort({ sharedAt: -1 })
            .lean();
        if (!location)
            throw ApiError_1.ApiError.notFound('No location found. Please share your location first.');
        // Reverse geocode to get human-readable address
        const address = await reverseGeocode(location.latitude, location.longitude);
        return {
            id: location._id.toString(),
            latitude: location.latitude,
            longitude: location.longitude,
            accuracy: location.accuracy ?? null,
            address: address ?? 'Address not available',
            sharedAt: location.sharedAt,
            mapsUrl: `https://www.google.com/maps?q=${location.latitude},${location.longitude}`,
        };
    },
};
//# sourceMappingURL=location.service.js.map