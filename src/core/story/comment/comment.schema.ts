import { z } from "zod";

export default class CommentSchema {
    static create = z.object({
        story_id: z.number({ required_error: "Story id is required" }),
        content: z.string().trim(),
    });

    static listByStoryId = z.object({
        story_id: z.number({ required_error: "Story id is required" }),
    });

    static update = this.create.partial();

    static validateCreateComment = (data: z.infer<typeof this.create>) => {
        return this.create.parse(data);
    };
    static validateUpdateComment = (data: z.infer<typeof this.update>) => {
        return this.update.parse(data);
    };

    static validateListByStoryId = (
        data: z.infer<typeof this.listByStoryId>
    ) => {
        return this.listByStoryId.parse(data);
    };
}
