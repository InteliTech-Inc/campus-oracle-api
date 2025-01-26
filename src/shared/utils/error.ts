import {ZodError} from "zod";
import CustomError from "../entities/custom_error";
import {Response} from 'express';
import {AuthError} from "@supabase/supabase-js";

/**
 * Handles error responses by checking the type of error and sending the appropriate HTTP response.
 *
 * @param {any} error - The error object to handle. This can be of any type, but is typically either a `ZodError` or `CustomError`.
 * @param {import("express").Response} res - The Express response object used to send the HTTP response.
 *
 * @description
 * - If the error is a `ZodError` (validation error from Zod), it extracts the first issue message,
 *   wraps it in a `CustomError` with a 400 status code, and sends the error as JSON.
 * - If the error is an instance of `CustomError`, it sends the custom error's status code and message as JSON.
 * - If the error is a Postgrest error from supabase, check the message and details field and return appropriate response
 * - For all other errors, it sends a generic 500 Internal Server Error response.
 *
 * @example
 * // Handling a ZodError
 * try {
 *   throw new ZodError(...);
 * } catch (error) {
 *   handleErrorResponse(error, res);
 * }
 *
 * @example
 * // Handling a CustomError
 * try {
 *   throw new CustomError(404, "Resource not found");
 * } catch (error) {
 *   handleErrorResponse(error, res);
 * }
 *
 * @example
 * // Handling an unknown error
 * try {
 *   throw new Error("Unexpected error");
 * } catch (error) {
 *   handleErrorResponse(error, res);
 * }
 */
export default function handleErrorResponse(error: any, res: Response) {

/**
 Just for Zod errors, the CustomerError is not used in this case
 A flatten version of the zod error is sent as response
     {
         "error": {
         "formErrors": [],
         "fieldErrors": {
             "phone": [
                "Expected string, received number"
             ],
             "token":   [
                "Token number is required"
             ]
            }
         }
     }
 **/

    /// Errors related with validation, i.e Zod validation errors
    if (error instanceof ZodError) {
        return res.status(400).json({
            error: error.flatten()
        });
    }

    /// Custom errors
    if (error instanceof CustomError) {
        return res.status(error.statusCode).json({
            error: error.toJSON()
        });
    }

   /*
   * When the error object has message and details field, we assume it is a PostgrestError from
   *  supabase
   */
    if (error && error.message && error.details) {
        const err = new CustomError(400, error.details || error.message)
        return res.status(err.statusCode).json({
            error: err.toJSON()
        });
    }

    // For any other unknown errors
    return res.status(500).json({
        error:new CustomError(500, error.message || 'Internal server error').toJSON()
    });
}
