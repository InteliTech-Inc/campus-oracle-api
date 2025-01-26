import { Request, Response } from "express";
import { UserSchema } from "./user.schema";
import User, { initialUser } from "./user.entities";
import UserService from "./user.service";
import handleErrorResponse from "../../shared/utils/error";
import AuthService from "../auth/auth.service";
import { z } from "zod";
import AvatarService from "../../shared/service/avatar";
import ImageService from "../../shared/service/image";
import CustomError from "../../shared/entities/custom_error";

/**
 * Handles user-related operations
 */
export default class UserController {
    /**
     * Creates a new user account
     */
    static createUser = async function (
        req: Request<{}, {}, z.infer<typeof UserSchema.createUser>>,
        res: Response
    ) {
        const { body } = req;

        /**
         * The [AuthMiddleware.authorise] middleware always attaches the user object to the request object. so id cannot be null here.
         */
        const { id } = req.user!;

        try {
            const { name, email, password } =
                UserSchema.validateCreateUser(body);
            const photo = AvatarService.generateUrl(name);

            /**
             * [initialUser] is a constant that contains the default values for a user object.
             * Look at the [user.entities.ts] file to see the structure of the user object.
             * */
            await UserService.create({
                ...initialUser,
                id,
                name,
                photo,
            });
            return res.sendStatus(201);
        } catch (error) {
            return handleErrorResponse(error, res);
        }
    };

    /**
     * Retrieves a single user row from the database
     */
    static retrieveUser = async function (
        req: Request<{ id: string }, {}, User>,
        res: Response
    ) {
        const { id } = req.params;

        try {
            const user = await UserService.retrieve(id);
            res.status(200).json({ data: user });
        } catch (e) {
            return handleErrorResponse(e, res);
        }
    };

    /**
     * Fetches all users in the database
     */
    static listUsers = async (req: Request, res: Response) => {
        try {
            const users = await UserService.list();
            return res.status(200).json({
                data: users,
            });
        } catch (e) {
            handleErrorResponse(e, res);
        }
    };

    /**
     * Deletes a user row from the database
     */
    static deleteUser = async function (
        req: Request<{ id: string }>,
        res: Response
    ) {
        const { id } = req.params;
        try {
            await Promise.all([
                await AuthService.signOut(),
                await UserService.delete(id),
            ]);
            res.sendStatus(201);
        } catch (e) {
            return handleErrorResponse(e, res);
        }
    };
}
