import express from "express";
import FormMiddleware from "src/shared/middleware/form";
import VendorVerificationController from "../verification.controller";
import FileMiddleware from "src/shared/middleware/file_uploader";
import AuthMiddleware from "src/shared/middleware/authorisation";
import RegexMiddleware from "src/shared/middleware/regex";

const router = express.Router();

// creates a new vendor verification

router.post(
    "/verifications",
    AuthMiddleware.authorise,
    FormMiddleware.validate,
    FileMiddleware.multiple([
        { name: "national_id_photo" },
        { name: "business_registration_cert_photo" },
    ]),
    VendorVerificationController.createVerification
);

// get a vendor verification
router.get(
    "/verifications/:id",
    RegexMiddleware.parseInteger,
    AuthMiddleware.authorise,
    VendorVerificationController.retrieveVerification
);

// get all vendor verifications
router.get(
    "/verifications",
    RegexMiddleware.parseInteger,
    AuthMiddleware.authorise,
    VendorVerificationController.listVerification
);

// update a vendor verification
router.patch(
    "/verifications/:id",
    RegexMiddleware.parseInteger,
    AuthMiddleware.authorise,
    VendorVerificationController.updateVerification
);

// delete a vendor verification
router.delete(
    "/verifications/:id",
    RegexMiddleware.parseInteger,
    AuthMiddleware.authorise,
    VendorVerificationController.deleteVerification
);

export { router as VendorVerificationRoutes };
