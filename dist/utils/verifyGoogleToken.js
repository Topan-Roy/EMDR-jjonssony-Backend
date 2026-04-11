"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyGoogleToken = void 0;
const google_auth_library_1 = require("google-auth-library");
const env_1 = require("../config/env");
const ApiError_1 = require("./ApiError");
const client = new google_auth_library_1.OAuth2Client(env_1.env.GOOGLE_CLIENT_ID);
const verifyGoogleToken = async (idToken) => {
    try {
        const ticket = await client.verifyIdToken({
            idToken,
            audience: env_1.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        if (!payload?.email)
            throw new Error('Invalid token payload');
        return {
            googleId: payload.sub,
            email: payload.email,
            firstName: payload.given_name || payload.name?.split(' ')[0] || 'User',
            lastName: payload.family_name || payload.name?.split(' ')[1] || '',
            avatar: payload.picture,
            emailVerified: payload.email_verified ?? false,
        };
    }
    catch {
        throw new ApiError_1.ApiError(401, 'INVALID_GOOGLE_TOKEN', 'Google token verification failed');
    }
};
exports.verifyGoogleToken = verifyGoogleToken;
//# sourceMappingURL=verifyGoogleToken.js.map