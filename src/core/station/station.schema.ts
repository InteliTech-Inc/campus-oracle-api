import { z } from "zod";

export default class StationSchema {
  /**
   * Describes the schema for the station object.
   * This acts like a DTO (Data Transfer Object) for the station entity.
   * */
  static createStation = z.object({
    lat: z.number({ required_error: "Latitude is required" }),
    long: z.number({ required_error: "Longitude is required" }),
    city: z.string({ required_error: "City is required" }).trim(),
    region: z.string({ required_error: "Region is required" }).trim(),
  });

  static updateStation = this.createStation.partial();
  /**
   * @returns The validated station object.
   * This method validates the station object against the schema.
   */
  static validateCreateStation = (data: z.infer<typeof this.createStation>) => {
    return this.createStation.parse(data);
  };

  static validateUpdateStation = (data: z.infer<typeof this.updateStation>) => {
    return this.updateStation.parse(data);
  };
}
