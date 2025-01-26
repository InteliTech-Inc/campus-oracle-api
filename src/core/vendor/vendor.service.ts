import { db } from "../../index";
import { TABLES } from "../../shared/constants/tables";
import CustomError from "../../shared/entities/custom_error";
import Vendor from "./vendor.entities";

export default class VendorService {
    /**
     * @param {Vendor} vendor - The object containing vendor details.
     */
    static create = async (
        vendor: Omit<Vendor, "created_at" | "updated_at">
    ): Promise<void> => {
        const { error } = await db.from(TABLES.VENDORS).insert(vendor);
        if (error) {
            throw new CustomError(401, error.details || error.message);
        }
        return;
    };

    static update = async (id: string, vendor: Partial<Vendor>) => {
        const { error } = await db
            .from(TABLES.VENDORS)
            .update(vendor)
            .eq("id", id);
        if (error) {
            throw new CustomError(401, error.details || error.message);
        }
        return;
    };

    /**
     * retrieves a single vendor from the database.
     *
     * @param {string} id - The ID of the vendor whose details is to be retrieved.
     */
    static retrieve = async (id: string): Promise<Vendor> => {
        const { data, error } = await db
            .from(TABLES.VENDORS)
            .select("*, users(*)")
            .eq("id", id)
            .single();

        if (error) {
            throw new CustomError(404, error.details || error.message);
        }

        /*
         * Supabase doesn't directly merge fields from related tables into a flat structure, so we
         *  achieve this by processing the data after retrieval.
         * */

        const { users, ...vendorFields } = data;
        // Merge user fields with vendor fields to fit the vendor entity
        return { ...users, ...vendorFields };
    };

    /**
     * retrieves all vendors from the database.
     */
    static list = async (): Promise<Vendor[]> => {
        const { data, error } = await db
            .from(TABLES.VENDORS)
            .select("*, users(*)");

        if (error) {
            throw new CustomError(404, error.details || error.message);
        }

        /*
         * Supabase doesn't directly merge fields from related tables into a flat structure, so we
         *  achieve this by processing the data after retrieval.
         * */

        return data
            .map((vendor) => ({
                ...vendor,
                ...vendor.users, // Merge fields from the users table
            }))
            .map(({ users, ...rest }) => rest); // Remove the nested users object
    };
}
