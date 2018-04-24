import { StationData } from "../../shared/StationData";
import { LatLng } from "../../shared/LatLng";
import { distanceCrowFlies } from "./distanceCrowFlies";
import { StationDataWithDistance } from "../../shared/StationDataWithDistance";


export const buildStationWithRawDistance =
    (station: StationData, loc: LatLng): StationDataWithDistance => {
    return {
        id: station.id,
        coords: station.coords,
        address: station.address,
        distanceFromLoc: distanceCrowFlies(loc, station.coords),
    };
};