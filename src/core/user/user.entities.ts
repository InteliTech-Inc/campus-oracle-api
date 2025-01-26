// The User type defines the structure of a user entity in the system.
export type User = {
    // A unique identifier for the user.
    id: string;

    // The full name of the user.
    name: string;

    // The user's phone number.
    phone?: string;

    // A URL or path to the user's profile photo.
    photo?: string;

    // The email address of the user.
    email: string;

    // The date and time the user record was created.
    created_at: Date;

    // The date and time the user record was last updated.
    updated_at: Date;
};

export const initialUser: Omit<User, "created_at" | "updated_at"> = {
    id: "",
    name: "",
    phone: "",
    photo: "",
    email: "",
};

export default User;
