export type VendorVerification = {
    // A unique identifier for the vendor (The vendor_id is the same as the user id on the users table)
    vendor_id: string;

    // The vendor's business registration number.
    business_registration_number: string;

    // A photo of the business registration certificate.
    business_registration_cert_photo: string;

    // The type of national ID (Ghana Card or Passport) used for the verification.
    national_id_type: "ghana_card" | "passport";

    // The ID number of the card used for the verification
    national_id: string;

    // A photo of the vendor's ID used for verification.
    national_id_photo: string;

    // The date and time the verification record was created.
    created_at: Date;

    // The date and time the verification record was last updated.
    updated_at: Date;
};
