// types.d.ts

import { Request } from 'express';
import {User} from "@supabase/supabase-js";

/**
 * Extending the default Request interface provided by Express to include an optional user field.
 * This allows the Request object to optionally contain user details, which can be useful for
 * authentication and authorization purposes.
 */
declare global {
    namespace Express {
        interface Request {
            user?: User | null;
        }
    }
}
