import { z } from "zod";
import { phoneRegex } from "src/shared/constants/regex";

export default class StorySchema {
    static story = z.object({
        content: z.string(),
        category: z.string({ required_error: "Category of story is required" }),
        sharing_type: z.enum(["public", "admin", "both"]),
        user: z
            .object({
                name: z
                    .string({ required_error: "name of user is required" })
                    .trim(),
                email: z.string().trim().email(),
                phone: z.string().regex(phoneRegex),
                campus: z.string().trim(),
            })
            .optional(),
    });

    static updateStory = this.story.omit({ user: true }).partial();

    static validateCreateStory = (data: z.infer<typeof this.story>) => {
        return this.story.parse(data);
    };

    static validateUpdateStory = (data: z.infer<typeof this.updateStory>) => {
        return this.updateStory.parse(data);
    };
}
