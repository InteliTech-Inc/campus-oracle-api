import { z } from "zod";
import Schema from "../../shared/schema";
import { UserSchema } from "../user/user.schema";

export default class VendorSchema {
    static user = UserSchema.createUser;

    static shop = z.object({
        name: z.string({ required_error: "Name of shop is required" }).trim(),
        description: z
            .string({ required_error: "Description of shop is required" })
            .trim(),
        address: Schema.address,
    });

    static createVendor = z.object({
        personal_details: this.user,
        shop_details: this.shop,
    });

    static updateVendor = this.shop.omit({ address: true }).partial();

    static validateCreateVendor = (data: z.infer<typeof this.createVendor>) => {
        return this.createVendor.parse(data);
    };

    static validateUpdateVendor = (data: z.infer<typeof this.updateVendor>) => {
        return this.updateVendor.parse(data);
    };
}
