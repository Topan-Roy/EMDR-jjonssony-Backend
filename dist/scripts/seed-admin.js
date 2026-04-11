"use strict";
/**
 * Admin Seed Script
 * Run: npx tsx src/scripts/seed-admin.ts
 *
 * Creates a default admin account if one doesn't exist.
 * Credentials are read from environment variables.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const env_1 = require("../config/env");
// ── Admin credentials — set these in .env ──────────────────
const ADMIN_FIRST_NAME = process.env.ADMIN_FIRST_NAME ?? 'Super';
const ADMIN_LAST_NAME = process.env.ADMIN_LAST_NAME ?? 'Admin';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? 'admin@myemdr.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? 'Admin@123456';
async function seedAdmin() {
    console.log('🔌 Connecting to database...');
    await mongoose_1.default.connect(env_1.env.DATABASE_URL, {
        maxPoolSize: 5,
        serverSelectionTimeoutMS: 5000,
    });
    console.log('✅ Database connected');
    // Lazy import after DB connect to avoid model registration issues
    const { User } = await Promise.resolve().then(() => __importStar(require('../modules/auth/auth.model')));
    // Check if admin already exists
    const existing = await User.findOne({ email: ADMIN_EMAIL });
    if (existing) {
        if (existing.role === 'admin') {
            console.log(`⚠️  Admin already exists: ${ADMIN_EMAIL}`);
            console.log('   No changes made.');
        }
        else {
            // Upgrade existing user to admin
            existing.role = 'admin';
            existing.isVerified = true;
            await existing.save();
            console.log(`✅ Existing user upgraded to admin: ${ADMIN_EMAIL}`);
        }
        await mongoose_1.default.disconnect();
        return;
    }
    // Validate password strength
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(ADMIN_PASSWORD)) {
        console.error('❌ ADMIN_PASSWORD is too weak.');
        console.error('   Must contain: uppercase, lowercase, number, special character, min 8 chars.');
        await mongoose_1.default.disconnect();
        process.exit(1);
    }
    const hashedPassword = await bcryptjs_1.default.hash(ADMIN_PASSWORD, 12);
    await User.create({
        firstName: ADMIN_FIRST_NAME,
        lastName: ADMIN_LAST_NAME,
        email: ADMIN_EMAIL,
        password: hashedPassword,
        role: 'admin',
        authProvider: 'email',
        isVerified: true,
        isProfileCompleted: true,
        isAcceptPrivacyStatement: true,
        privacyAcceptedAt: new Date(),
    });
    console.log('');
    console.log('✅ Admin account created successfully!');
    console.log('─────────────────────────────────────');
    console.log(`   Email    : ${ADMIN_EMAIL}`);
    console.log(`   Password : ${ADMIN_PASSWORD}`);
    console.log(`   Role     : admin`);
    console.log('─────────────────────────────────────');
    console.log('⚠️  Change the password after first login!');
    console.log('');
    await mongoose_1.default.disconnect();
    console.log('🔌 Database disconnected');
}
seedAdmin().catch((err) => {
    console.error('❌ Seed failed:', err.message);
    mongoose_1.default.disconnect();
    process.exit(1);
});
//# sourceMappingURL=seed-admin.js.map