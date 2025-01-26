import { z } from "zod";
import { phoneRegex } from "../../shared/constants/regex";
import Schema from "src/shared/schema";

export class UserSchema {
  static createUser = z.object({
    name: z.string({ required_error: "Full name is required" }).trim(),
    email: z.string().trim().email().optional(),
    phone: z.string({ required_error: "Phone number is required" }).trim().regex(phoneRegex, "Invalid Number!"),
    photo: z
      .any()
      .refine((file) => file && file.mimetype && file.mimetype.startsWith("image/"), { message: "Photo must be an image file" })
      .optional(),
    address: Schema.address,
  });

  static updateUser = this.createUser
    .omit({
      // Exclude the 'phone' field from the update schema. We'll use separate endpoints to
      // modify phone number
      phone: true,
    })
    .partial();

  /**
   * A method to validate data against the 'create' schema.
   * @param data - The data to validate.
   * @returns The validated data or throws a Zod error.
   */
  static validateCreateUser(data: z.infer<typeof this.createUser>) {
    return this.createUser.parse(data);
  }

  static validateUpdateUser(data: z.infer<typeof this.updateUser>) {
    return this.updateUser.parse(data);
  }
}
