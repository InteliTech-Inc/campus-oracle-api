import { Router } from "express";
import AuthController from "../auth.controller";
import AuthMiddleware from "../../../shared/middleware/authorisation";

const router = Router();

/// signs out the user
router.post("/admin/sign-out", AuthController.signOut);

// sign in an admin
router.post("/admin/sign-in", AuthController.adminSignIn);

// admin request password reset
router.post("/admin/forgot-password", AuthController.resetAdminPassWord);

// change admin password
router.post("/admin/reset-password", AuthController.changeAdminPassword);
export { router as AuthRoutes };
