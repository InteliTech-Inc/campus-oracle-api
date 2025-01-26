import { z } from "zod";
import { otpRegex, phoneRegex } from "src/shared/constants/regex";

// Schema for validating authentication related request bodies
export class AuthSchema {
    static generateOtp = z.object({
        phone: z
            .string({ required_error: "Phone number is required" })
            .trim()
            .regex(phoneRegex, "Invalid Number!")
            .min(10, "Phone number is too short!")
            .max(15, "Phone number is too long!")
            .refine((phone) => phone.startsWith("+"), {
                message: "Phone number must start with a '+' sign",
            }),
        channel: z.enum(["sms", "whatsapp"]).default("sms"),
    });

    static verifyOtp = z.object({
        phone: z
            .string({ required_error: "Phone number is required" })
            .trim()
            .regex(phoneRegex, "Invalid Phone number!"),
        token: z
            .string({ required_error: "Token number is required" })
            .trim()
            .regex(otpRegex, "Invalid Token number!")
            .length(6, "Token number must be 6 digits"),
        type: z.enum(["sms", "phone_change"]).default("sms"),
    });

    static updatePhone = z.object({
        phone: z
            .string({ required_error: "Phone number is required" })
            .trim()
            .regex(phoneRegex, "Invalid Number!")
            .min(10, "Phone number is too short!")
            .max(15, "Phone number is too long!")
            .refine((phone) => phone.startsWith("+"), {
                message: "Phone number must start with a '+' sign",
            }),
    });

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

    /**
     * A method to validate data against the SignUpWithOTPShape schema.
     * @param data - The data to validate.
     * @returns The validated data or throws a Zod error.
     */
    static validateGenerateOtp(data: z.infer<typeof this.generateOtp>) {
        return this.generateOtp.parse(data);
    }

    /**
     * A method to validate data against the VerifyOTPShape schema.
     * @param data - The data to validate.
     * @returns The validated data or throws a Zod error.
     */
    static validateVerifyOtp(data: z.infer<typeof this.verifyOtp>) {
        return this.verifyOtp.parse(data);
    }

    /**
     * A method to validate data against the UpdatePhoneShape schema.
     * @param data - The data to validate.
     * @returns The validated data or throws a Zod error.
     */
    public static validateUpdatePhone(data: z.infer<typeof this.updatePhone>) {
        return this.updatePhone.parse(data);
    }

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
