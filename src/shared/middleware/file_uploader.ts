import multer from "multer";

const storage = multer.memoryStorage()

/**
 * Class to handle file uploads using multer
 */
class FileMiddleware {
    /**
     * Returns a middleware to handle single file upload
     * @param fieldName - Name of the field for the file
     */
    public static single(fieldName: string) {
        return multer({storage}).single(fieldName);
    }

    /**
     * Returns a middleware to handle multiple file uploads for different fields
     * @param fields - Array of fields to accept files
     */
    public static multiple(fields: { name: string; maxCount?: number }[]) {
        return multer({storage}).fields(fields);
    }

}

export default FileMiddleware;
