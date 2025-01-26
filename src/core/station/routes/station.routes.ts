import express from "express";
import AuthMiddleware from "../../../shared/middleware/authorisation";
import RegexMiddleware from "../../../shared/middleware/regex";
import StationController from "../station.controller";

const router = express.Router();

// create a new station
router.post("/",
    AuthMiddleware.authorise,
    StationController.createStation
);

// update an existing station
router.patch("/:id",
    RegexMiddleware.parseInteger,
    AuthMiddleware.authorise,
    StationController.updateStation
);

// delete a station
router.delete("/:id",
    RegexMiddleware.parseInteger,
    AuthMiddleware.authorise,
    StationController.deleteStation
);

// fetch all stations
router.get("/",
    AuthMiddleware.authorise,
    StationController.listStations
);

// fetch a station by id
router.get("/:id",
    RegexMiddleware.parseInteger,
    AuthMiddleware.authorise,
    StationController.retrieveStation
);

export {router as StationsRoutes};