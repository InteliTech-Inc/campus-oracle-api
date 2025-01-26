import { Request, Response } from "express";
import { z } from "zod";
import handleErrorResponse from "../../shared/utils/error";
import StationSchema from "./station.schema";
import { initialStation } from "./station.entities";
import StationService from "./station.service";

export default class StationController {
  /**
   * Creates a new station
   */
  static createStation = async function (
    req: Request<{}, {}, z.infer<typeof StationSchema.createStation>>,
    res: Response,
  ) {
    const { body } = req;

    try {
      const { long, lat, city, region } =
        StationSchema.validateCreateStation(body);

      /**
       * [initialStation] is a constant that contains the default values for a station object.
       * Look at the [station.entities.ts] file to see the structure of the station object.
       * */
      await StationService.create({
        ...initialStation,
        city,
        long,
        lat,
        region,
      });

      return res.sendStatus(201);
    } catch (error) {
      return handleErrorResponse(error, res);
    }
  };

  /**
   * Retrieves a single station row from the database
   */
  static retrieveStation = async function (
    req: Request<{ id: string }, {}>,
    res: Response,
  ) {
    const { id } = req.params;
    try {
      const station = await StationService.retrieve(id);
      res.status(200).json({ data: station });
    } catch (e) {
      return handleErrorResponse(e, res);
    }
  };

  /**
   * Updates the station row of an existing station
   */
  static updateStation = async function (
    req: Request<
      {
        id: string;
      },
      {},
      z.infer<typeof StationSchema.updateStation>
    >,
    res: Response,
  ) {
    const {
      body,
      params: { id },
    } = req;

    try {
      const validatedBody = StationSchema.validateUpdateStation(body);
      await StationService.update(id, validatedBody);

      return res.sendStatus(201);
    } catch (error) {
      return handleErrorResponse(error, res);
    }
  };

  /**
   * Fetches all stations in the database
   */
  static listStations = async (req: Request, res: Response) => {
    try {
      const stations = await StationService.list();
      return res.status(200).json({
        data: stations,
      });
    } catch (e) {
      handleErrorResponse(e, res);
    }
  };

  /**
   * Deletes a station row from the database
   */
  static deleteStation = async function (
    req: Request<{ id: string }>,
    res: Response,
  ) {
    const { id } = req.params;
    try {
      await StationService.delete(id);
      res.sendStatus(201);
    } catch (e) {
      return handleErrorResponse(e, res);
    }
  };
}
