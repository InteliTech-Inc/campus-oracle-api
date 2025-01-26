import {NextFunction, Request, Response} from "express";
import CustomError from "../entities/custom_error";
import {uuidRegex, integerRegex} from "../constants/regex";


/**
 *
 * Middleware for handling regular expressions in specific routes, mainly dynamic routes.
 * */
class RegexMiddleware {

    /**
     * Handles the validation of the user id in the request parameters, ensuring it is a valid UUID.
     */
    public static parseUUID = (req: Request, res: Response, next: NextFunction) => {
        const {id: userId} = req.params;
        if (!userId) {
            const error = new CustomError(400, 'Required parameter, id is missing');
            return res.status(error.statusCode).json(error.toJSON());
        }

        if (!uuidRegex.test(userId)) {
            const error = new CustomError(400, 'Invalid format for request parameter, id');
            return res.status(error.statusCode).json(error.toJSON());
        }

        return next();
    }

    /*
    * We're using parseInteger in full to avoid clashing with Javascript's parseInt function
    * */
    public static parseInteger = (req: Request, res: Response, next: NextFunction) => {
        const {id: userId} = req.params;

        if (!userId) {
            const error = new CustomError(400, 'Required parameter, id is missing');
            return res.status(error.statusCode).json(error.toJSON());
        }

        if (!integerRegex.test(userId)) {
            if (!uuidRegex.test(userId)) {
                const error = new CustomError(400, 'Invalid format for request parameter, id');
                return res.status(error.statusCode).json(error.toJSON());
            }
        }

        return next();

    }
}


export default RegexMiddleware;