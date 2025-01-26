import { Request, Response } from "express";
import handleErrorResponse from "src/shared/utils/error";
import CommentSchema from "./comment.schema";
import CommentService from "./comment.service";

export default class VendorApplicationController {
    static updateComment = async (
        req: Request<{ id: string }>,
        res: Response
    ) => {
        const {
            params: { id },
            body,
        } = req;

        try {
            const validatedBody = CommentSchema.validateUpdateComment(body);

            await CommentService.update(id, validatedBody);

            return res.sendStatus(201);
        } catch (e) {
            return handleErrorResponse(e, res);
        }
    };

    static retrieveComment = async (
        req: Request<{ id: string }>,
        res: Response
    ) => {
        const {
            params: { id },
        } = req;

        try {
            const comment = await CommentService.retrieve(id);

            return res.status(200).json(comment);
        } catch (e) {
            return handleErrorResponse(e, res);
        }
    };

    static deleteComment = async (
        req: Request<{ id: string }>,
        res: Response
    ) => {
        const {
            params: { id },
        } = req;

        try {
            await CommentService.delete(id);

            return res.sendStatus(201);
        } catch (e) {
            return handleErrorResponse(e, res);
        }
    };
}
