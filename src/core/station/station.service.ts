import {db} from "src/index";
import Station from "./station.entities";
import {TABLES} from "../../shared/constants/tables";
import CustomError from "../../shared/entities/custom_error";

/**
 * StationService provides methods for managing rider stations in the application.
 */
export default class StationService {
    /**
     * @param {Station} station - The station object containing the station details to be created.
     */
    static create = async (
        station: Omit<Station, "id" | "created_at" | "updated_at">,
    ): Promise<void> => {
        const {error} = await db.from(TABLES.STATIONS).insert(station);
        if (error) {
            throw new CustomError(401, error.details || error.message);
        }
        return;
    };

    /**
     * retrieves a single station from the database.
     *
     * @param {string} id - The ID of the station to be retrieved.
     */
    static retrieve = async (id: string): Promise<Station> => {
        const {data, error} = await db
            .from(TABLES.STATIONS)
            .select("*")
            .eq("id", id)
            .single();
        if (error) {
            throw new CustomError(404, error.details || error.message);
        }
        return data;
    };

    /**
     * Updates an existing station in the database.
     *
     * @param {string} id - The ID of the station to be updated.
     * @param {Partial<Station>} stationPayload - The partial station data to be updated.
     */
    static update = async (id: string, stationPayload: Partial<Station>) => {
        const {data, error} = await db
            .from(TABLES.STATIONS)
            .update({...stationPayload})
            .eq("id", id)
            .select("*")
            .single();

        if (error) {
            throw new CustomError(400, error.details);
        }

        if (!data) {
            throw new CustomError(404, "Station not found");
        }
        return;
    };

    /**
     * retrieves all stations from the database.
     */
    static list = async (): Promise<Station[]> => {
        const {data, error} = await db.from(TABLES.STATIONS).select("*");
        if (error) {
            throw new CustomError(404, error.details || error.message);
        }
        return data as Station[];
    };

    /**
     * Deletes an existing station from the database.
     *
     * @param {string} id - The ID of the station to be deleted.
     */
    static delete = async (id: string) => {
        const {error} = await db.from(TABLES.STATIONS).delete().eq("id", id);

        if (error) {
            throw new CustomError(404, error.details || error.message);
        }
        return;
    };
}
