import { db } from "src";
import { TABLES } from "src/shared/constants/tables";
import CustomError from "src/shared/entities/custom_error";
import { Comment } from "./comment.entities";

export default class CommentService {
    static listByStoryId = async (id: number): Promise<Comment[]> => {
        const { data, error } = await db
            .from(TABLES.COMMENTS)
            .select("*")
            .eq("story_id", id);
        if (error) {
            throw new CustomError(400, error.details || error.message);
        }

        return data;
    };

    /**
     * @param {Comment} comment - The object containing the comment
     * to be created.
     */
    static create = async (
        comment: Omit<Comment, "id" | "created_at" | "updated_at">
    ): Promise<void> => {
        const { error } = await db.from(TABLES.COMMENTS).insert(comment);
        if (error) {
            throw new CustomError(400, error.details || error.message);
        }
        return;
    };

    static retrieve = async (id: string): Promise<Comment> => {
        const { data, error } = await db
            .from(TABLES.COMMENTS)
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
        comment: Partial<Comment>
    ): Promise<void> => {
        const { error } = await db
            .from(TABLES.COMMENTS)
            .update(comment)
            .eq("id", id);

        if (error) {
            throw new CustomError(400, error.details || error.message);
        }

        return;
    };

    static delete = async (id: string): Promise<void> => {
        const { error } = await db.from(TABLES.COMMENTS).delete().eq("id", id);

        if (error) {
            throw new CustomError(404, error.details || error.message);
        }

        return;
    };
}
