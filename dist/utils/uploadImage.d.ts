/**
 * Upload a file buffer to Cloudinary
 * Returns the secure URL of the uploaded image
 */
export declare const uploadToCloudinary: (buffer: Buffer, folder: string, publicId: string) => Promise<string>;
/**
 * Delete an image from Cloudinary by URL
 */
export declare const deleteFromCloudinary: (imageUrl: string) => Promise<void>;
//# sourceMappingURL=uploadImage.d.ts.map