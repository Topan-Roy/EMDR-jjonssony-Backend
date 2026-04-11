"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFromCloudinary = exports.uploadToCloudinary = void 0;
const cloudinary_1 = require("../config/cloudinary");
const logger_1 = require("../config/logger");
/**
 * Upload a file buffer to Cloudinary
 * Returns the secure URL of the uploaded image
 */
const uploadToCloudinary = (buffer, folder, publicId) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary_1.cloudinary.uploader.upload_stream({
            folder,
            public_id: publicId,
            overwrite: true,
            resource_type: 'image',
            transformation: [
                { width: 400, height: 400, crop: 'fill', gravity: 'face' },
                { quality: 'auto', fetch_format: 'auto' },
            ],
        }, (error, result) => {
            if (error || !result) {
                logger_1.logger.error('Cloudinary upload failed', { error });
                return reject(new Error('Image upload failed'));
            }
            resolve(result.secure_url);
        });
        stream.end(buffer);
    });
};
exports.uploadToCloudinary = uploadToCloudinary;
/**
 * Delete an image from Cloudinary by URL
 */
const deleteFromCloudinary = async (imageUrl) => {
    try {
        // Extract public_id from URL
        const parts = imageUrl.split('/');
        const folder = parts[parts.length - 2];
        const filename = parts[parts.length - 1].split('.')[0];
        const publicId = `${folder}/${filename}`;
        await cloudinary_1.cloudinary.uploader.destroy(publicId);
    }
    catch (err) {
        logger_1.logger.warn('Cloudinary delete failed', { imageUrl });
    }
};
exports.deleteFromCloudinary = deleteFromCloudinary;
//# sourceMappingURL=uploadImage.js.map