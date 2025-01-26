import { db } from "../../index";
import CustomError from "../../shared/entities/custom_error";
import { Session } from "@supabase/supabase-js";
import { differenceInSeconds } from "date-fns";
import PartialSession from "./auth.entities";

export default class AuthService {
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
}
