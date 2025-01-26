import { z } from "zod";
import { RequestFiles } from "src/core/rider/rider.schema";
export default class VendorVerificationSchema {
    private static create = z.object({
        national_id_photo: z
            .any()
            .refine(
                (file) =>
                    file && file.mimetype && file.mimetype.startsWith("image/"),
                { message: "National ID photo must be an image file" }
            ),
        business_registration_cert_photo: z
            .any()
            .refine(
                (file) =>
                    file && file.mimetype && file.mimetype.startsWith("image/"),
                {
                    message:
                        "Business registration certificate photo must be an image file",
                }
            ),
        national_id_type: z.enum(["ghana_card", "passport"], {
            required_error: "Type of national ID used is required",
        }),
        national_id: z
            .string({
                required_error: "National id number is required",
            })
            .trim(),
        business_registration_number: z
            .string({
                required_error: "Business registration number is required",
            })
            .trim(),
    });

    static update = this.create
        .omit({
            business_registration_cert_photo: true,
            national_id_photo: true,
        })
        .partial();

    static validateCreate = (data: z.infer<typeof this.create>) => {
        return this.create.parse(data);
    };

    static validateUpdate = (data: z.infer<typeof this.update>) => {
        return this.update.parse(data);
    };

    static parseRequestBody = (
        body: any,
        files: { [key: string]: RequestFiles }
    ) => {
        const {
            national_id_photo: national_id_file,
            business_registration_cert_photo: business_registration_cert_file,
        } = files;

        return {
            ...body,
            business_registration_cert_photo:
                business_registration_cert_file?.[0],
            national_id_photo: national_id_file?.[0],
        };
    };
}
