"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrivacyPolicy = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const sectionSchema = new mongoose_1.Schema({
    title: { type: String, required: true, trim: true, maxlength: 100 },
    content: { type: String, required: true, trim: true },
    order: { type: Number, required: true },
}, { _id: false });
const privacySchema = new mongoose_1.Schema({
    version: { type: String, required: true, trim: true },
    overview: { type: String, required: true, trim: true },
    effectiveDate: { type: Date, required: true, default: Date.now },
    lastUpdated: { type: Date, required: true, default: Date.now },
    changelog: { type: String, trim: true },
    sections: { type: [sectionSchema], required: true },
    contactEmail: { type: String, required: true, trim: true, lowercase: true },
    contactName: { type: String, required: true, trim: true },
    isActive: { type: Boolean, default: true },
    createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    updatedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });
privacySchema.index({ isActive: 1 });
privacySchema.index({ createdAt: -1 });
privacySchema.index({ effectiveDate: -1 });
exports.PrivacyPolicy = mongoose_1.default.model('PrivacyPolicy', privacySchema);
//# sourceMappingURL=privacy.model.js.map