import { ROLE } from "src/core/user/user.entities";

// The Application entity defines the structure for user role (vendor or rider) applications.
type Application = {
    // A unique identifier for the application.
    id: number;

    // The ID of the user submitting the application (Same as the id of the user on the users table).
    user_id: string;

    // The current status of the application, which can be 'pending', 'declined', or 'approved'.
    status: "pending" | "declined" | "approved";

    // Feedback provided by an admin regarding the status of the application.
    feedback: string;

    // The role the user is applying for.
    user_role: ROLE;

    // The date and time the application was created.
    created_at: Date;

    // The date and time the application was last updated.
    updated_at: Date;
};

export const initialVendorApplication: Omit<
    Application,
    "id" | "created_at" | "updated_at"
> = {
    user_id: "",
    status: "pending",
    user_role: ROLE.VENDOR,
    feedback: "",
};

export default Application;
