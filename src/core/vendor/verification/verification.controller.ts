import { Request, Response } from "express";
import ImageService from "src/shared/service/image";
import { VendorVerification } from "./verification.entities";
import { initialVendorApplication } from "../application/application.entities";
import VendorVerificationService from "./verification.service";
import handleErrorResponse from "src/shared/utils/error";
import { z } from "zod";
import { RequestFiles } from "src/core/rider/verification/verification.schema";
import { ROLE } from "../../user/user.entities";
import VendorVerificationSchema from "./verification.schema";
import VendorApplicationService from "../application/application.service";

export default class VendorVerificationController {
    /*
     * Create a new vendor verification. It creates an application together with
     *  the verification
     * */

    static createVerification = async (req: Request, res: Response) => {
        try {
            const { body, user } = req;

            const { id: userId } = user!;

            // Extract uploaded files from the request
            const files = req.files as { [key: string]: RequestFiles };

            // Parse and format the request body and uploaded files for the schema validation
            const requestBody = VendorVerificationSchema.parseRequestBody(
                body,
                files
            );

            const {
                national_id_photo: valid_national_id_photo,
                business_registration_cert_photo: business_reg_photo,
                ...rest
            } = VendorVerificationSchema.validateCreate(requestBody);

            // Defining the list of photos to be uploaded with corresponding folders to be used
            // inside the uploadMultiple() method.
            const photos = [
                {
                    fieldName: "national_id_photo",
                    file: valid_national_id_photo,
                    folder: ImageService.nationalIdsFolder,
                },
                {
                    fieldName: "business_registration_cert_photo",
                    file: business_reg_photo,
                    folder: ImageService.businessRegCertificatesFolder,
                },
            ];

            // Upload multiple images concurrently and retrieve the URLs of successful uploads
            const { national_id_photo, business_registration_cert_photo } =
                await ImageService.uploadMultiple(photos);

            // Prepare the payload for vendor verification with uploaded photo URLs
            const verificationPayload: Omit<
                VendorVerification,
                "created_at" | "updated_at"
            > = {
                ...rest,
                vendor_id: userId,
                national_id_photo,
                business_registration_cert_photo,
            };

            // Prepare the application payload for the vendor
            const application = {
                ...initialVendorApplication,
                user_id: userId,
                user_role: ROLE.VENDOR,
            };

            // create verification and application concurrently
            await Promise.all([
                VendorVerificationService.create(verificationPayload),
                VendorApplicationService.create(application),
            ]);

            return res.sendStatus(201);
        } catch (error) {
            console.log(error);
            handleErrorResponse(error, res);
        }
    };

    static updateVerification = async (
        req: Request<
            { id: string },
            {},
            z.infer<typeof VendorVerificationSchema.update>
        >,
        res: Response
    ) => {
        const {
            body,
            params: { id },
        } = req;

        const validatedObject = VendorVerificationSchema.validateUpdate(body);

        await VendorVerificationService.update(id, validatedObject);

        return res.sendStatus(201);
    };

    static deleteVerification = async (
        req: Request<{ id: string }>,
        res: Response
    ) => {
        const {
            params: { id },
        } = req;

        await VendorVerificationService.delete(id);

        return res.sendStatus(204);
    };

    static retrieveVerification = async (
        req: Request<{ id: string }>,
        res: Response
    ) => {
        const {
            params: { id },
        } = req;

        try {
            const verification = await VendorVerificationService.retrieve(id);

            return res.status(200).json(verification);
        } catch (e) {
            return handleErrorResponse(e, res);
        }
    };

    static listVerification = async (req: Request, res: Response) => {
        try {
            const verifications = await VendorVerificationService.list();

            return res.status(200).json({ data: verifications });
        } catch (e) {
            return handleErrorResponse(e, res);
        }
    };
}
