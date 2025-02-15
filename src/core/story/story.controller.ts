import { Request, Response } from "express";
import { z } from "zod";
import handleErrorResponse from "../../shared/utils/error";
import StorySchema from "./story.schema";
import { initialStory } from "./story.entities";
import StoryService from "./story.service";
import UserService from "../user/user.service";
export default class StoryController {
    /**
     * Creates a new story
     */
    static createStory = async function (
        req: Request<{}, {}, z.infer<typeof StorySchema.story>>,
        res: Response
    ) {
        const { body } = req;

        try {
            const { user, ...rest } = StorySchema.validateCreateStory(body);

            const story = await StoryService.create({
                ...initialStory,
                ...rest,
            });

            if (user) {
                await UserService.create({
                    ...user,
                    story_id: story.id,
                });
            }

            return res.sendStatus(201);
        } catch (error) {
            return handleErrorResponse(error, res);
        }
    };

    /*
     * Update the story details
     * */

    static updateStory = async (
        req: Request<
            { id: string },
            {},
            z.infer<typeof StorySchema.updateStory>
        >,
        res: Response
    ) => {
        const {
            body,
            params: { id },
        } = req;

        try {
            const validatedBody = StorySchema.validateUpdateStory(body);
            await StoryService.update(id, validatedBody);
            res.sendStatus(201);
        } catch (e) {
            handleErrorResponse(e, res);
        }
    };

    /*
     * Retrieve a single story details
     * */

    static retrieveStory = async (
        req: Request<{ id: string }>,
        res: Response
    ) => {
        const { id } = req.params;

        try {
            const story = await StoryService.retrieve(id);
            res.status(200).json({ data: story });
        } catch (e) {
            return handleErrorResponse(e, res);
        }
    };
    /*
     * List all stories
     * */
    static listStories = async (req: Request, res: Response) => {
        try {
            const stories = await StoryService.list();
            return res.status(200).json({
                data: stories,
            });
        } catch (e) {
            handleErrorResponse(e, res);
        }
    };
    /*
     * Delete a story
     * */
    static deleteStory = async (
        req: Request<{ id: string }>,
        res: Response
    ) => {
        try {
            const {
                params: { id },
            } = req;
            await StoryService.delete(id);
            return res.sendStatus(201);
        } catch (e) {
            handleErrorResponse(e, res);
        }
    };
}
