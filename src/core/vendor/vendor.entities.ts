import User from "../user/user.entities";
import { Availability } from "./availability/availability.entities";

// Defining the Vendor type by extending the User entity, excluding the "role" property. We don't need the role on the vendor table
export type Vendor = Omit<User, "role"> & {
    // A description of the vendor or their services.
    description: string;

    // An array of availability schedules for the vendor.
    availability: Availability[];
};

export const initialVendor: Omit<Vendor, "created_at" | "updated_at"> = {
    id: "",
    name: "",
    photo: "",
    phone: "",
    description: "",
    address: [],
    availability: [],
};

export default Vendor;
