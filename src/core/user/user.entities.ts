import Address from "../../shared/entities/address";

// An enumeration to represent the different roles a user can have in the system.
export enum ROLE {
  // Represents a regular user of the system.
  USER = "user",

  // Represents a vendor providing services or products.
  VENDOR = "vendor",

  // Represents a rider delivering goods or services.
  RIDER = "rider",
}

// The User type defines the structure of a user entity in the system.
export type User = {
  // A unique identifier for the user.
  id: string;

  // The full name of the user.
  name: string;

  // The user's phone number.
  phone: string;

  // A URL or path to the user's profile photo.
  photo: string;

  // An array of addresses associated with the user.
  address: Address[];

  // The email address of the user.
  email?: string;

  // The role assigned to the user.
  role: ROLE;

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
  address: [],
  role: ROLE.USER,
};

export default User;
