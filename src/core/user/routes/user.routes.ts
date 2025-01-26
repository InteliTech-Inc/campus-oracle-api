import express from "express";
import AuthMiddleware from "../../../shared/middleware/authorisation";
import UserController from "../user.controller";

import RegexMiddleware from "../../../shared/middleware/regex";

const router = express.Router();

// create a new user
router.post("/", AuthMiddleware.authorise, UserController.createUser);

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

export { router as UserRoutes };
