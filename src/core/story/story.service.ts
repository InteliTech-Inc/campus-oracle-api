import { db } from "../../index";
import { TABLES } from "../../shared/constants/tables";
import CustomError from "../../shared/entities/custom_error";
import Story from "./story.entities";

export default class StoryService {
    /**
     * @param {Story} story - The object containing story details.
     */
    static create = async (
        story: Omit<Story, "created_at" | "updated_at" | "id" | "comments">
    ): Promise<Story> => {
        const { data, error } = await db
            .from(TABLES.STORIES)
            .upsert(story)
            .select();
        if (error) {
            throw new CustomError(400, error.details || error.message);
        }
        return data[0] as Story;
    };

    static update = async (id: string, story: Partial<Story>) => {
        const { error } = await db
            .from(TABLES.STORIES)
            .update(story)
            .eq("id", id);
        if (error) {
            throw new CustomError(400, error.details || error.message);
        }
        return;
    };

    /**
     * retrieves a single story from the database.
     *
     * @param {string} id - The ID of the story whose details is to be retrieved.
     */
    static retrieve = async (id: string): Promise<Story> => {
        const { data, error } = await db
            .from(TABLES.STORIES)
            .select("*, comments(*), users(*)")
            .eq("id", id)
            .single();

        if (error) {
            throw new CustomError(404, error.details || error.message);
        }

        /*
         * Supabase doesn't directly merge fields from related tables into a flat structure, so we
         *  achieve this by processing the data after retrieval.
         * */

        // Merge user fields with story fields to fit the story entity
        return data;
    };

    /**
     * retrieves all stories from the database.
     */
    static list = async (): Promise<Story[]> => {
        const { data, error } = await db
            .from(TABLES.STORIES)
            .select("*, comments(*), users(*)");

        if (error) {
            throw new CustomError(404, error.details || error.message);
        }

        /*
         * Supabase doesn't directly merge fields from related tables into a flat structure, so we
         *  achieve this by processing the data after retrieval.
         * */

        return data;
    };
}
