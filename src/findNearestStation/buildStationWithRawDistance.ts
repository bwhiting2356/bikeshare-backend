import { LatLng } from "../../shared/LatLng";
import { distanceCrowFlies } from "./distanceCrowFlies";
import { StationDataWithDistance } from "../../shared/StationDataWithDistance";
import { StationAttributes } from "../../db/models/station/StationAttributes";

export const buildStationWithRawDistance =
    (station: StationAttributes, loc: LatLng): StationDataWithDistance => {

    const coords: LatLng = {
        lat: station.lat,
        lng: station.lng
    };
    return {
        ...station,
        distanceFromLoc: distanceCrowFlies(loc, coords),
    };
};