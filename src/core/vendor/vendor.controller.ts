import { Request, Response } from "express";
import { z } from "zod";
import AvatarService from "../../shared/service/avatar";
import { initialAddress } from "../../shared/entities/address";
import UserService from "../user/user.service";
import { initialUser, ROLE } from "../user/user.entities";
import handleErrorResponse from "../../shared/utils/error";
import VendorSchema from "./vendor.schema";
import VendorService from "./vendor.service";
import { initialVendor } from "./vendor.entities";
export default class VendorController {
    /**
     * Creates a new vendor account
     */
    static createVendor = async function (
        req: Request<{}, {}, z.infer<typeof VendorSchema.createVendor>>,
        res: Response
    ) {
        const { body } = req;

        /**
         * The [AuthMiddleware.authorise] middleware always attaches the user object to the request object. so id cannot be null here.
         */
        const { id } = req.user!;

        try {
            const {
                shop_details: {
                    name: shopName,
                    address: shopAddress,
                    description,
                },
                personal_details: { name, address, phone },
            } = VendorSchema.validateCreateVendor(body);

            const photo = AvatarService.generateUrl(name);

            const updatedAddress = { ...initialAddress, ...address };

            /**
             * [initialUser] is a constant that contains the default values for a user object.
             * */

            const createUser = async () => {
                return await UserService.create({
                    ...initialUser,
                    id,
                    name,
                    phone,
                    photo,
                    role: ROLE.VENDOR,
                    address: [{ ...updatedAddress }],
                });
            };

            const createVendor = async () => {
                await VendorService.create({
                    ...initialVendor,
                    id,
                    name: shopName,
                    photo,
                    address: [{ ...initialAddress, ...shopAddress }],
                    description,
                });
            };

            await Promise.all([createUser(), createVendor()]);

            return res.sendStatus(201);
        } catch (error) {
            return handleErrorResponse(error, res);
        }
    };

    /*
     * Update the vendor details
     * */

    static updateVendor = async (
        req: Request<
            { id: string },
            {},
            z.infer<typeof VendorSchema.updateVendor>
        >,
        res: Response
    ) => {
        const {
            body,
            params: { id },
        } = req;

        try {
            const validatedBody = VendorSchema.validateUpdateVendor(body);
            await VendorService.update(id, validatedBody);
            res.sendStatus(201);
        } catch (e) {
            handleErrorResponse(e, res);
        }
    };

    /*
     * Retrieve a single vendor details
     * */

    static retrieveVendor = async (
        req: Request<{ id: string }>,
        res: Response
    ) => {
        const { id } = req.params;

        try {
            const vendor = await VendorService.retrieve(id);
            res.status(200).json({ data: vendor });
        } catch (e) {
            return handleErrorResponse(e, res);
        }
    };
    /*
     * List all vendors
     * */
    static listVendor = async (req: Request, res: Response) => {
        try {
            const vendors = await VendorService.list();
            return res.status(200).json({
                data: vendors,
            });
        } catch (e) {
            handleErrorResponse(e, res);
        }
    };
}
