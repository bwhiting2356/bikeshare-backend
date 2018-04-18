import { Station } from "../../shared/Station";
import { LatLng } from "../../shared/LatLng";
import { distanceCrowFlies } from "./distanceCrowFlies";
import { StationWithDistance } from "../../shared/StationWithDistance";


export const buildStationWithRawDistance =
    (station: Station, loc: LatLng): StationWithDistance => {
    return {
        id: station.id,
        coords: station.coords,
        address: station.address,
        distanceFromLoc: distanceCrowFlies(loc, station.coords),
    };
};