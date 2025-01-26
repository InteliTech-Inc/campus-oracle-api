import { phoneRegex } from "src/shared/constants/regex";
import { z } from "zod";

export class UserSchema {
    static createUser = z.object({
        name: z.string({ required_error: "Full name is required" }).trim(),
        password: z
            .string()
            .trim()
            .regex(
                phoneRegex,
                "password must contain at least 8 charactors, an uppercase letter, lowercase letter and a symbol"
            ),
        email: z.string().trim().email(),
    });

    /**
     * A method to validate data against the 'create' schema.
     * @param data - The data to validate.
     * @returns The validated data or throws a Zod error.
     */
    static validateCreateUser(data: z.infer<typeof this.createUser>) {
        return this.createUser.parse(data);
    }
}
