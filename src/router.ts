import express from 'express';
import { ROUTES } from "./core/routes";

const router = express.Router();

/**
 * Registers the main application router.
 *
 * @description
 * This file defines the central router for the application. It imports the `ROUTES` object from `src/core/routes.`,
 * which contains all sub-routers, and attaches it to the `/api` path. In depth explanation can be found in the README under
 * special files.
 */

router.use("/", ROUTES);

/**
 * Exports the `router` object as the default export for integration with the Express application.
 *
 * @example
 * import router from './router';
 * app.use(router);
 */
export default router;
