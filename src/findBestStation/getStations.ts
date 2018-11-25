import { Station } from "../../db/models/station/Station";
import { StationAttributes } from "../../db/models/station/StationAttributes";

export const getStations = async (): Promise<StationAttributes[]> => {
    return Station.findAll({ raw: true });
    // TODO: if I take out 'async' it complains about the type, why?
};