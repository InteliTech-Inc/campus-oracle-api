import express from "express";
import VendorController from "../vendor.controller";
import RegexMiddleware from "../../../shared/middleware/regex";
import AuthMiddleware from "../../../shared/middleware/authorisation";
import { VendorVerificationRoutes } from "../verification/routes/verification.routes";
import { VendorApplicationRoutes } from "../application/routes/application.routes";

const router = express.Router();

// create a new vendor
router.post("/", AuthMiddleware.authorise, VendorController.createVendor);

// retrieves a single vendor
router.get(
    "/:id",
    RegexMiddleware.parseUUID,
    AuthMiddleware.authorise,
    VendorController.retrieveVendor
);

// update an existing vendor
router.patch(
    "/:id",
    /// Makes sure [:id] is a valid UUID
    RegexMiddleware.parseUUID,
    AuthMiddleware.authorise,
    VendorController.updateVendor
);

// fetch all vendors
router.get("/", AuthMiddleware.authorise, VendorController.listVendor);

// A router that contains all the routes for vendor verification
router.use(VendorVerificationRoutes);

// A router that contains all the routes for vendor application
router.use(VendorApplicationRoutes);

export { router as VendorRoutes };
