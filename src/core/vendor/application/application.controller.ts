import { Request, Response } from "express";
import ApplicationService from "./application.service";
import handleErrorResponse from "src/shared/utils/error";
import ApplicationSchema from "./application.schema";

export default class VendorApplicationController {
    static listApplications = async (req: Request, res: Response) => {
        try {
            const applications = await ApplicationService.list();

            return res.status(200).json({ data: applications });
        } catch (e) {
            return handleErrorResponse(e, res);
        }
    };

    static updateApplication = async (
        req: Request<{ id: string }>,
        res: Response
    ) => {
        const {
            params: { id },
            body,
        } = req;

        try {
            const validatedBody =
                ApplicationSchema.validateUpdateApplication(body);

            await ApplicationService.update(id, validatedBody);

            return res.sendStatus(201);
        } catch (e) {
            return handleErrorResponse(e, res);
        }
    };

    static retrieveApplication = async (
        req: Request<{ id: string }>,
        res: Response
    ) => {
        const {
            params: { id },
        } = req;

        try {
            const application = await ApplicationService.retrieve(id);

            return res.status(200).json(application);
        } catch (e) {
            return handleErrorResponse(e, res);
        }
    };

    static deleteApplication = async (
        req: Request<{ id: string }>,
        res: Response
    ) => {
        const {
            params: { id },
        } = req;

        try {
            await ApplicationService.delete(id);

            return res.sendStatus(201);
        } catch (e) {
            return handleErrorResponse(e, res);
        }
    };
}
