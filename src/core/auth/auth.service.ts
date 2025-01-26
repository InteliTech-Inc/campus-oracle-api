import { db } from "../../index";
import CustomError from "../../shared/entities/custom_error";
import { Session } from "@supabase/supabase-js";
import { differenceInSeconds } from "date-fns";
import PartialSession from "./auth.entities";
import * as console from "node:console";
import UserService from "../user/user.service";

/**
 * AuthService class handles OTP-based authentication.
 */
export default class AuthService {
    /**
     * @param {string} phone - The phone number to send the OTP to.
     * @param channel - The channel to send the OTP to.
     */

    static generateOtp = async ({
        phone,
        channel,
    }: {
        phone: string;
        channel: "sms" | "whatsapp";
    }): Promise<void> => {
        const { error } = await db.auth.signInWithOtp({
            phone,
            options: { channel },
        });

        if (error) {
            throw new CustomError(error.status || 400, error.message);
        }
        return;
    };

    /**
     * Verifies the OTP provided by the user.
     * @param {string} phone - The phone number associated with the OTP.
     * @param token - The OTP token to verify.
     * @param type - The type of OTP verification, either "sms" or "phone_change".
     */
    public static verifyOtp = async ({
        phone,
        token,
        type,
    }: {
        phone: string;
        token: string;
        type: "sms" | "phone_change";
    }): Promise<PartialSession> => {
        const {
            data: { session },
            error,
        } = await db.auth.verifyOtp({
            phone,
            token,
            type,
        });

        if (error) {
            throw new CustomError(error.status || 400, error.message);
        }

        if (!session) {
            throw new CustomError(401, "Invalid session");
        }

        const {
            access_token,
            refresh_token,
            user: { created_at, last_sign_in_at },
        } = session;
        const createdAt = new Date(created_at!);
        const lastSignInAt = new Date(last_sign_in_at!);

        /// If the user signed in within 60 seconds, they are a new user (the otp is valid for 60s)
        return {
            access_token,
            refresh_token,
            is_new_user: differenceInSeconds(lastSignInAt, createdAt) <= 60,
        };
    };

    /**
     * Signs out the user from supabase
     */
    static signOut = async () => {
        const { error } = await db.auth.signOut();

        if (error) {
            throw new CustomError(error.status || 401, error.message);
        }
        return;
    };

    /**
     * Changes the phone number the user uses to sign in.
     */
    public static updatePhone = async ({ phone }: { phone: string }) => {
        const { error } = await db.auth.updateUser({ phone });

        if (error) {
            throw new CustomError(
                error.status || 400,
                error.message || "Could not update phone number"
            );
        }
        return;
    };

    /**
     * Create a new admin account
     */

    public static adminSignIn = async ({
        email,
        password,
    }: {
        email: string;
        password: string;
    }) => {
        const {
            data: { session },
            error,
        } = await db.auth.signInWithPassword({ email, password });

        if (error) {
            throw new CustomError(error.status || 400, error.message);
        }

        if (!session) {
            throw new CustomError(401, "Invalid session");
        }

        const {
            access_token,
            refresh_token,
            user: { created_at, last_sign_in_at },
        } = session;
        const createdAt = new Date(created_at!);
        const lastSignInAt = new Date(last_sign_in_at!);

        /// If the user signed in within 10 seconds, they are a new user
        return {
            access_token,
            refresh_token,
            is_new_user: differenceInSeconds(lastSignInAt, createdAt) <= 10,
        };
    };

    public static resetAdminPassword = async ({
        email,
        redirectTo,
    }: {
        email: string;
        redirectTo: string;
    }) => {
        const { error } = await db.auth.resetPasswordForEmail(email, {
            redirectTo,
        });

        if (error) {
            throw new CustomError(error.status || 400, error.message);
        }

        return;
    };

    public static changeAdminPassword = async ({
        newPassword,
    }: {
        newPassword: string;
    }) => {
        const { error } = await db.auth.updateUser({ password: newPassword });

        if (error) {
            throw new CustomError(error.status || 400, error.message);
        }
        return;
    };
}
