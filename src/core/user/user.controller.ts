import { Request, Response } from "express";
import { UserSchema } from "./user.schema";
import User, { initialUser } from "./user.entities";
import UserService from "./user.service";
import handleErrorResponse from "../../shared/utils/error";
import AuthService from "../auth/auth.service";
import { z } from "zod";
import AvatarService from "../../shared/service/avatar";
import ImageService from "../../shared/service/image";
import CustomError from "../../shared/entities/custom_error";

/**
 * Handles user-related operations
 */
export default class UserController {}
