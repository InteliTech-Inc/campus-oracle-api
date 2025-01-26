import { Router } from "express";
import AuthController from "../auth.controller";
import AuthMiddleware from "../../../shared/middleware/authorisation";

const router = Router();

/// sends an OTP to the user's phone number
router.post("/generate-otp", AuthController.generateOtp);

/// verifies the OTP provided by the user
router.post("/verify-otp", AuthController.verifyOtp);

/// signs out the user
router.post("/sign-out", AuthController.signOut);

/// updates the user's phone number
router.post(
    "/update-phone",
    AuthMiddleware.authorise,
    AuthController.updatePhone
);
// sign in an admin
router.post("/admin/sign-in", AuthController.adminSignIn);

// admin request password reset
router.post("/admin/forgot-password", AuthController.resetAdminPassWord);

// change admin password
router.post("/admin/reset-password", AuthController.changeAdminPassword);
export { router as AuthRoutes };
