import express from "express";
import AuthMiddleware from "src/shared/middleware/authorisation";
import CommentController from "../comment.controller";
import RegexMiddleware from "src/shared/middleware/regex";

const router = express.Router();

// fetch all comments
router.get(
    "/",
    AuthMiddleware.authorise
    // CommentController.li
);

// retrieves a single comment
router.get(
    "/:id",
    RegexMiddleware.parseInteger,
    AuthMiddleware.authorise,
    CommentController.retrieveComment
);

// update an existing comment
router.patch(
    "/:id",
    RegexMiddleware.parseInteger,
    AuthMiddleware.authorise,
    CommentController.updateComment
);

// delete a comment
router.delete(
    "/:id",
    RegexMiddleware.parseInteger,
    AuthMiddleware.authorise,
    CommentController.deleteComment
);

export { router as CommentRoutes };
