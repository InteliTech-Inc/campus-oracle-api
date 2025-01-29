import express from "express";
import { AuthRoutes } from "./auth/routes/auth.routes";
import { UserRoutes } from "./user/routes/user.routes";
import CustomError from "../shared/entities/custom_error";
import { StoryRoutes } from "./story/routes/story.routes";
import { CommentRoutes } from "./story/comment/routes/comment.routes";

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
router.use("/stories", StoryRoutes);
router.use("/comments", CommentRoutes);
router.use("/users", UserRoutes);

router.all("*", (req, res) => {
    const error = new CustomError(404, "Route not found");
    res.status(error.statusCode).json(error.toJSON());
});

export { router as ROUTES };
