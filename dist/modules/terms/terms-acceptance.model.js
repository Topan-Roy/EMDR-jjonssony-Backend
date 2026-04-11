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
exports.TermsAcceptance = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const termsAcceptanceSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    termsId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Terms', required: true },
    version: { type: String, required: true },
    acceptedAt: { type: Date, required: true, default: Date.now },
    ipAddress: { type: String },
    userAgent: { type: String },
}, { timestamps: false });
termsAcceptanceSchema.index({ userId: 1, termsId: 1 }, { unique: true });
termsAcceptanceSchema.index({ userId: 1, acceptedAt: -1 });
termsAcceptanceSchema.index({ termsId: 1 });
exports.TermsAcceptance = mongoose_1.default.model('TermsAcceptance', termsAcceptanceSchema);
//# sourceMappingURL=terms-acceptance.model.js.map