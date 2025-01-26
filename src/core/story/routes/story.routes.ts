import express from "express";
import StoryController from "../story.controller";
import RegexMiddleware from "../../../shared/middleware/regex";
import AuthMiddleware from "../../../shared/middleware/authorisation";
import { CommentRoutes } from "../comment/routes/comment.routes";

const router = express.Router();

// create a new story
router.post("/", StoryController.createStory);

// retrieves a single story
router.get("/:id", RegexMiddleware.parseUUID, StoryController.retrieveStory);

// update an existing story
router.patch(
    "/:id",
    /// Makes sure [:id] is a valid UUID
    RegexMiddleware.parseUUID,
    AuthMiddleware.authorise,
    StoryController.updateStory
);

// fetch all stories
router.get("/", StoryController.listStories);

router.use("/comments", CommentRoutes);

export { router as StoryRoutes };
