import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import cookieParser from "cookie-parser";
import Config from "src/shared/config";
import Router from "src/router";

dotenv.config({
    debug: true,
});
const app = express();
const port = process.env.PORT || 3000;

const { database, specs } = Config.initialize();
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));
app.use(Router);

export { database as db };

// Server
app.listen(port, (): void => console.log(`Server is running on ${port}`));
