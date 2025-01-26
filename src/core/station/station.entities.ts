type Station = {
  // unique identity for the station
  id: number;

  // The name of the city of the station
  city: string;

  // The region where the station is located
  region: string;

  // Longitude of the station
  long: number;

  // Latitude of the station
  lat: number;

  // The date the station was first created
  created_at: Date;

  // The date the station was last updated
  updated_at: Date;
};

export const initialStation: Omit<Station, "id" | "created_at" | "updated_at"> = {
  city: "",
  region: "",
  long: 0,
  lat: 0,
};

export default Station;
