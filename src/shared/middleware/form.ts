import { NextFunction, Response, Request } from "express";
import CustomError from "../entities/custom_error";

// Class to handle form data validation¬
class FormMiddleware {
    /**
     * Middleware to check if the request has a `Content-Type` of `multipart/form-data`.
     *
     * This middleware ensures that the incoming request's `Content-Type` header includes `multipart/form-data`.
     * If the header is missing or has an invalid value, it responds with a `400 Bad Request` status.
     *
     * @param {Request} req - The HTTP request object.
     * @param {Response} res - The HTTP response object.
     * @param {NextFunction} next - The next middleware function in the Express pipeline.
     *
     * @example
     *
     * // Use the middleware in an Express route
     * app.post('/upload', checkFormData, (req, res) => {
     *   res.send('File uploaded successfully!');
     * });
     */

    public static validate = (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        if (!req.is("multipart/form-data")) {
            const error = new CustomError(
                400,
                "Invalid content type. Expected 'multipart/form-data'"
            );
            return res.status(error.statusCode).json(error.toJSON());
        }
        next();
    };
}

export default FormMiddleware;
