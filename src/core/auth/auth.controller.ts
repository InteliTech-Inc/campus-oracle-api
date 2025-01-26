import AuthService from "./auth.service";
import { CookieOptions, Request, Response } from "express";
import { AuthSchema } from "./auth.schema";
import handleErrorResponse from "../../shared/utils/error";
import { z } from "zod";

const COOKIE_OPTIONS: CookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7 * 1000, // 7 days
};

/**
 * AuthController handles authentication-related requests and responses.
 */
export default class AuthController {
    static generateOtp = async function (
        req: Request<{}, {}, z.infer<typeof AuthSchema.generateOtp>>,
        res: Response
    ) {
        try {
            const { phone, channel } = AuthSchema.validateGenerateOtp(req.body);
            await AuthService.generateOtp({ phone, channel });

            return res.sendStatus(200);
        } catch (error: any) {
            return handleErrorResponse(error, res);
        }
    };

    static verifyOtp = async function (
        req: Request<{}, {}, z.infer<typeof AuthSchema.verifyOtp>>,
        res: Response
    ) {
        try {
            const validatedBody = AuthSchema.validateVerifyOtp(req.body);

            const { phone, token, type } = validatedBody;

            const data = await AuthService.verifyOtp({ phone, token, type });

            res.cookie("refresh_token", data.refresh_token, COOKIE_OPTIONS);
            return res.status(200).json({ data });
        } catch (error: any) {
            return handleErrorResponse(error, res);
        }
    };

    public static updatePhone = async function (
        req: Request<{}, {}, z.infer<typeof AuthSchema.updatePhone>>,
        res: Response
    ) {
        try {
            const { phone } = AuthSchema.validateUpdatePhone(req.body);

            await AuthService.updatePhone({ phone });

            return res.sendStatus(200);
        } catch (error: any) {
            return handleErrorResponse(error, res);
        }
    };

    public static signOut = async function (req: Request, res: Response) {
        try {
            await AuthService.signOut();
            res.clearCookie("refresh_token", COOKIE_OPTIONS);
            req.user = null;

            return res.sendStatus(200);
        } catch (err) {
            return handleErrorResponse(err, res);
        }
    };

    public static adminSignIn = async function (req: Request, res: Response) {
        try {
            const validatedBody = AuthSchema.validateAdminSignIn(req.body);

            const { email, password } = validatedBody;

            const data = await AuthService.adminSignIn({ email, password });

            res.cookie("refresh_token", data.refresh_token, COOKIE_OPTIONS);
            return res.status(200).json({ data });
        } catch (e) {
            return handleErrorResponse(e, res);
        }
    };

    public static resetAdminPassWord = async function (
        req: Request<{}, {}, { email: string; redirectTo: string }>,
        res: Response
    ) {
        const body = req.body;

        try {
            const { email, redirectTo } = AuthSchema.validateResetAdminPassword(
                { ...body }
            );

            await AuthService.resetAdminPassword({ email, redirectTo });
            return res.sendStatus(200);
        } catch (e) {
            return handleErrorResponse(e, res);
        }
    };

    public static changeAdminPassword = async function (
        req: Request<{}, {}, { newPassword: string }>,
        res: Response
    ) {
        const body = req.body;
        try {
            const { newPassword } = AuthSchema.validateChangePassword({
                ...body,
            });

            await AuthService.changeAdminPassword({ newPassword });
            return res.sendStatus(200);
        } catch (e) {
            return handleErrorResponse(e, res);
        }
    };
}
