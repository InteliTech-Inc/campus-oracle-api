import express from "express";
import { AuthRoutes } from "./auth/routes/auth.routes";
import { UserRoutes } from "./user/routes/user.routes";
import CustomError from "../shared/entities/custom_error";
import { StationsRoutes } from "./station/routes/station.routes";
import { RiderRoutes } from "./rider/routes/rider.routes";
import { MenusRoutes } from "./menu/routes/menu.routes";
import { VendorRoutes } from "./vendor/routes/vendor.routes";

const router = express.Router();

// This is used for testing
router.get("/", (req, res) => {
    return res.status(200).json({
        version: "1.0.0",
        message: "Welcome to Oneway API",
    });
});

/**
 * Registers the core module routes in the application.
 * This file defines the main router for the application.
 * In depth explanation can be found in the README under special files.
 */
router.use("/auth", AuthRoutes);
router.use("/riders", RiderRoutes);
router.use("/vendors", VendorRoutes);
router.use("/stations", StationsRoutes);
router.use("/users", UserRoutes);
router.use("/menu", MenusRoutes);

router.all("*", (req, res) => {
    const error = new CustomError(404, "Route not found");
    res.status(error.statusCode).json(error.toJSON());
});

export { router as ROUTES };
