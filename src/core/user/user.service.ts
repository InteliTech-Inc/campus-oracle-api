import CustomError from "../../shared/entities/custom_error";
import { db } from "src/index";
import User from "./user.entities";
import * as process from "node:process";
import { TABLES } from "../../shared/constants/tables";
import * as console from "node:console";

/**
 * UserService provides methods for managing user profiles in the application.
 */
export default class UserService {
    /**
     * @param {User} user - The user object containing profile details to be created.
     */
    static create = async (
        user: Omit<User, "created_at" | "updated_at" | "id">
    ): Promise<void> => {
        const { error } = await db.from(TABLES.USERS).insert(user);
        if (error) {
            throw new CustomError(401, error.details || error.message);
        }
        return;
    };

    /**
     * retrieves a single user from the database.
     *
     * @param {string} id - The ID of the user whose details is to be retrieved.
     */
    static retrieve = async (id: string): Promise<User> => {
        const { data, error } = await db
            .from(TABLES.USERS)
            .select("*")
            .eq("id", id)
            .single();
        if (error) {
            throw new CustomError(404, error.details || error.message);
        }
        return data;
    };

    /**
     * Updates an existing user profile in the database.
     *
     * @param {string} id - The ID of the user whose profile is to be updated.
     * @param {Partial<User>} userInfo - The partial user profile data to be updated.
     */
    public static update = async (
        id: string,
        userInfo: Partial<User>
    ): Promise<User> => {
        const { data, error } = await db
            .from(TABLES.USERS)
            .update({ ...userInfo })
            .eq("id", id)
            .select()
            .single();

        if (error) {
            throw new CustomError(400, error.details);
        }

        if (!data) {
            throw new CustomError(404, "User not found");
        }

        return data as User;
    };

    /**
     * retrieves all users from the database.
     */
    static list = async (): Promise<User[]> => {
        const { data, error } = await db.from(TABLES.USERS).select("*");
        if (error) {
            throw new CustomError(404, error.details || error.message);
        }
        return data;
    };

    /**
     * Deletes an existing user from the database.
     *
     * @param {string} id - The ID of the user whose profile is to be deleted.
     */
    static delete = async (id: string) => {
        const deleteUserFromAuthTable = async () => {
            const response = await fetch(
                `${process.env.SUPABASE_URL}/auth/v1/admin/users/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_KEY}`,
                        "Content-Type": "application/json",
                        apikey: `${process.env.SUPABASE_ANON_KEY}`,
                    },
                }
            );

            if (!response.ok) {
                throw new CustomError(401, "Could not delete user");
            }
            return;
        };

        await deleteUserFromAuthTable();
        return;
    };
}
