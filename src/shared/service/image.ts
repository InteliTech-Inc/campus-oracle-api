import { db } from "src/index";
import CustomError from "../entities/custom_error";
import * as process from "node:process";

/**
 * Handles image uploads to supabase
 */
export default class ImageService {
    /**
     * @param {Express.Multer.File} file - The image file to be uploaded.
     * @param folder - Name of folder you want to store the file in.
     */

    /**
     * Generates a unique file path for an uploaded image.
     * @param {Express.Multer.File} file - The file object containing the original name of the image.
     * @param folder - The folder you want to store the file in.
     * @returns {{ filePath: string }} An object containing the generated file path.
     * @private
     */
    private static generateFilePath = (
        file: Express.Multer.File,
        folder: string
    ): { filePath: string } => {
        const fileName = file.originalname;

        const randomString = Math.random().toString(36).substring(2, 15);
        const slicedExtension = fileName.slice(fileName.lastIndexOf("."));

        const filePath = `${folder}/${randomString}${slicedExtension}`;

        return { filePath };
    };

    public static upload = async (
        file: Express.Multer.File,
        folder: string
    ) => {
        const { filePath } = this.generateFilePath(file, folder);

        const { data, error } = await db.storage
            .from("campus-oracle")
            .upload(filePath, file.buffer, {
                contentType: "image/*",
                upsert: false,
            });

        if (error) {
            throw new CustomError(400, error.message);
        }
        return {
            fullPath: `${process.env.SUPABASE_IMAGE_BASE_URL}/${data.fullPath}`,
        };
    };

    public static avatarFolder = "avatars";
}
