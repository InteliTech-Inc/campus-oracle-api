import {CookieOptions, NextFunction, Request, Response} from "express";
import {db} from "../../index";
import CustomError from "../entities/custom_error";

// Configuration for secure cookies
const COOKIE_OPTIONS: CookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7 * 1000, // 7 days
    path: "/",
};

// Class to handle authentication and token management
class AuthMiddleware {

    // Middleware to handle authentication and token refresh
    static async authorise(req: Request, res: Response, next: NextFunction) {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            const resError = new CustomError(401, "No authorization key.");
            return res.status(resError.statusCode).json(resError.toJSON());
        }

        const accessToken = token;
        const refreshToken = req.cookies.refresh_token;

        try {
            // try getting the user's session
            const {data, error} = await db.auth.getSession();

            // Generate a new access token from the refresh token if there's
            // no session but refresh token is available and valid.
            if ((error && refreshToken) || (!data.session && refreshToken)) {
                return AuthMiddleware.handleTokenRefresh(req, res, next, accessToken, refreshToken);
            }

            if (error) {
                const resError = new CustomError(401, error.message || "Authentication failed. Please log in again.");
                return res.status(resError.statusCode).json(resError.toJSON());
            }

            if (data.session) {
                // Allow the user only if there's session data
                req.user = data.session?.user;
                return next();
            }

            return res.status(401).json(new CustomError(401, 'Authentication failed. Please log in again.'))

        } catch (err: any) {
            const error = new CustomError(500, err.message || "Server error during authentication");
            return res.status(error.statusCode).json(error.toJSON());
        }
    }

    // Helper function to refresh the access token
    private static async handleTokenRefresh(
        req: Request,
        res: Response,
        next: NextFunction,
        accessToken: string,
        refreshToken: string
    ) {
        try {
            const {data: refreshData, error: refreshError} = await db.auth.refreshSession({
                refresh_token: refreshToken,
            });

            if (refreshError || !refreshData.session) {
                const error = new CustomError(401, refreshError?.message || "Session expired. Please log in again.");
                return res.status(error.statusCode).json(error.toJSON());
            }

            const {refresh_token} = refreshData.session;

            res.cookie("refresh_token", refresh_token, COOKIE_OPTIONS);

            // Add the new token to the request header
            req.headers.authorization = `Bearer ${accessToken}`;
            req.user = refreshData.user;
            return next();

        } catch (err: any) {
            const error = new CustomError(500, err.message || "Server error during token refresh");
            return res.status(error.statusCode).json(error.toJSON());
        }
    }
}

export default AuthMiddleware;
