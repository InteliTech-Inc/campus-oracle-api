import express from "express";
import AuthMiddleware from "src/shared/middleware/authorisation";
import VendorApplicationController from "../application.controller";
import RegexMiddleware from "src/shared/middleware/regex";

const router = express.Router();

// fetch all vendor applications
router.get(
    "/application/",
    AuthMiddleware.authorise,
    VendorApplicationController.listApplications
);

// retrieves a single application
router.get(
    "/application/:id",
    RegexMiddleware.parseInteger,
    AuthMiddleware.authorise,
    VendorApplicationController.retrieveApplication
);

// update an existing application
router.patch(
    "/application/:id",
    RegexMiddleware.parseInteger,
    AuthMiddleware.authorise,
    VendorApplicationController.updateApplication
);

// delete an application
router.delete(
    "/application/:id",
    RegexMiddleware.parseInteger,
    AuthMiddleware.authorise,
    VendorApplicationController.deleteApplication
);

export { router as VendorApplicationRoutes };
