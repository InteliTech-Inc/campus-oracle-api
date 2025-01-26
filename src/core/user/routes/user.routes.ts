import express from "express";
import AuthMiddleware from "../../../shared/middleware/authorisation";
import UserController from "../user.controller";
import FileMiddleware from "../../../shared/middleware/file_uploader";
import FormMiddleware from "../../../shared/middleware/form";
import RegexMiddleware from "../../../shared/middleware/regex";

const router = express.Router();

// create a new user
router.post("/", AuthMiddleware.authorise, UserController.createUser);

// update an existing user
router.patch(
    "/:id",
    /// Makes sure [:id] is a valid UUID
    RegexMiddleware.parseUUID,
    AuthMiddleware.authorise,
    UserController.updateUser
);

// delete a user
router.delete(
    "/:id",
    RegexMiddleware.parseUUID,
    AuthMiddleware.authorise,
    UserController.deleteUser
);

// fetch all users
router.get("/", AuthMiddleware.authorise, UserController.listUsers);

// fetch a user by id
router.get(
    "/:id",
    RegexMiddleware.parseUUID,
    AuthMiddleware.authorise,
    UserController.retrieveUser
);

// updates a user's profile photo

router.patch(
    "/photo/:id",
    RegexMiddleware.parseUUID,
    // Makes sure the body is form data
    FormMiddleware.validate,
    FileMiddleware.single("photo"),
    UserController.updatePhoto
);

export { router as UserRoutes };
