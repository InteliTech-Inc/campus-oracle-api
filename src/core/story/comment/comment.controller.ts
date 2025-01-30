import { Request, Response } from "express";
import handleErrorResponse from "src/shared/utils/error";
import CommentSchema from "./comment.schema";
import CommentService from "./comment.service";
import { z } from "zod";
import CustomError from "src/shared/entities/custom_error";

export default class VendorApplicationController {
    static createComment = async (
        req: Request<{}, {}, z.infer<typeof CommentSchema.create>>,
        res: Response
    ) => {
        const { body } = req;

        try {
            const validatedObj = CommentSchema.validateCreateComment(body);
            await CommentService.create(validatedObj);
            return res.sendStatus(201);
        } catch (e) {
            return handleErrorResponse(e, res);
        }
    };

    static listComments = async (
        req: Request<{}, {}, { story_id: number }>,
        res: Response
    ) => {
        const { body } = req;
        const search = new URLSearchParams(req.url);

        const id = search.get("/?story_id");

        if (!id) {
            const error = new CustomError(400, "Missing search param story_id");
            return handleErrorResponse(error, res);
        }

        try {
            const identifier = parseInt(id);
            const comments = await CommentService.listByStoryId(identifier);
            return res.status(200).json({ data: comments });
        } catch (error) {
            return handleErrorResponse(error, res);
        }
    };
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
