import { z } from "zod";

export default class ApplicationSchema {
    static update = z.object({
        status: z.enum(["pending", "declined", "approved"], {
            required_error: "The status of the application is required",
        }),
        feedback: z
            .string({
                required_error:
                    "The feedback for the selected status is required",
            })
            .trim(),
    });

    static validateUpdateApplication = (data: z.infer<typeof this.update>) => {
        return this.update.parse(data);
    };
}
