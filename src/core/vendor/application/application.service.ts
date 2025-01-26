import User from "src/core/user/user.entities";
import { db } from "src";
import { TABLES } from "src/shared/constants/tables";
import CustomError from "src/shared/entities/custom_error";
import Application from "./application.entities";

export default class VendorApplicationService {
    static list = async (): Promise<Application[]> => {
        const { data, error } = await db
            .from(TABLES.APPLICATIONS)
            .select("*")
            .eq("user_role", "vendor");
        if (error) {
            throw new CustomError(400, error.details || error.message);
        }

        return data;
    };

    /**
     * @param {Application} application - The object containing user (rider or vendor) application
     * to be created.
     */
    static create = async (
        application: Omit<Application, "id" | "created_at" | "updated_at">
    ): Promise<void> => {
        const { error } = await db
            .from(TABLES.APPLICATIONS)
            .insert(application);
        if (error) {
            throw new CustomError(400, error.details || error.message);
        }
        return;
    };

    static retrieve = async (id: string): Promise<Application> => {
        const { data, error } = await db
            .from(TABLES.APPLICATIONS)
            .select("*")
            .eq("id", id)
            .single();

        if (error) {
            throw new CustomError(400, error.details || error.message);
        }

        return data;
    };

    static update = async (
        id: string,
        application: Partial<Application>
    ): Promise<void> => {
        const { error } = await db
            .from(TABLES.APPLICATIONS)
            .update(application)
            .eq("id", id);

        if (error) {
            throw new CustomError(400, error.details || error.message);
        }

        return;
    };

    static delete = async (id: string): Promise<void> => {
        const { error } = await db
            .from(TABLES.APPLICATIONS)
            .delete()
            .eq("id", id);

        if (error) {
            throw new CustomError(404, error.details || error.message);
        }

        return;
    };
}
