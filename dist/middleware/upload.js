"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadChatImage = exports.uploadProfilePic = void 0;
const multer_1 = __importDefault(require("multer"));
const ApiError_1 = require("../utils/ApiError");
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const MAX_SIZE_MB = 5;
const storage = multer_1.default.memoryStorage();
const imageUploader = (0, multer_1.default)({
    storage,
    limits: { fileSize: MAX_SIZE_MB * 1024 * 1024 },
    fileFilter: (_req, file, cb) => {
        if (!ALLOWED_TYPES.includes(file.mimetype)) {
            return cb(new ApiError_1.ApiError(400, 'INVALID_FILE_TYPE', 'Only JPEG, PNG and WebP images are allowed'));
        }
        cb(null, true);
    },
});
// Named exports — semantically correct per use case
exports.uploadProfilePic = imageUploader.single('profilePic');
// Chat image — optional file field, also accepts text-only form-data
exports.uploadChatImage = imageUploader.fields([
    { name: 'image', maxCount: 1 },
]);
//# sourceMappingURL=upload.js.map