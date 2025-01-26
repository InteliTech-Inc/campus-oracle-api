import User from "src/core/user/user.entities";
import { db } from "src";
import CustomError from "src/shared/entities/custom_error";
import { TABLES } from "src/shared/constants/tables";
import { VendorVerification } from "./verification.entities";

export default class VendorVerificationService {
    static create = async (
        verification: Omit<
            VendorVerification,
            "id" | "created_at" | "updated_at"
        >
    ) => {
        const { error } = await db
            .from(TABLES.VENDOR_VERIFICATIONS)
            .insert(verification);

        if (error) {
            throw new CustomError(400, error.details || error.message);
        }

        return;
    };

    static update = async (
        id: string,
        verification: Partial<VendorVerification>
    ) => {
        const { error } = await db
            .from(TABLES.VENDOR_VERIFICATIONS)
            .update(verification)
            .eq("id", id);
        if (error) {
            throw new CustomError(400, error.details || error.message);
        }
        return;
    };

    static delete = async (id: string) => {
        const { error } = await db
            .from(TABLES.VENDOR_VERIFICATIONS)
            .delete()
            .eq("id", id);

        if (error) {
            throw new CustomError(404, error.details || error.message);
        }
    };

    static retrieve = async (id: string): Promise<VendorVerification> => {
        const { data, error } = await db
            .from(TABLES.VENDOR_VERIFICATIONS)
            .select("*")
            .eq("id", id)
            .single();

        if (error) {
            throw new CustomError(400, error.details || error.message);
        }

        return data;
    };

    static list = async (): Promise<VendorVerification[]> => {
        const { data, error } = await db
            .from(TABLES.VENDOR_VERIFICATIONS)
            .select("*");

        if (error) {
            throw new CustomError(400, error.details || error.message);
        }
        return data;
    };
}
