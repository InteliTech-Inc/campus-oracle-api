import { z } from "zod";

// Schema for validating authentication related request bodies
export class AuthSchema {
    static adminSignIn = z.object({
        email: z.string({ required_error: "Email is required" }).trim().email(),
        password: z.string({ required_error: "Password is required" }).trim(),
    });

    static resetAdminPassword = z.object({
        email: z.string({ required_error: "Email is required" }).trim().email(),
        redirectTo: z
            .string({ required_error: "redirectTo url is required" })
            .trim(),
    });

    static changePassword = z.object({
        newPassword: z
            .string({ required_error: "Password is required" })
            .trim(),
    });

    /// Method to validate new admin signup payload
    public static validateAdminSignIn(data: z.infer<typeof this.adminSignIn>) {
        return this.adminSignIn.parse(data);
    }

    public static validateResetAdminPassword(
        data: z.infer<typeof this.resetAdminPassword>
    ) {
        return this.resetAdminPassword.parse(data);
    }

    public static validateChangePassword(
        data: z.infer<typeof this.changePassword>
    ) {
        return this.changePassword.parse(data);
    }
}
