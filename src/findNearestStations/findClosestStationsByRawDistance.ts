import { Station } from '../../shared/Station';
import { LatLng } from '../../shared/LatLng';
import { StationWithDistance } from "../../shared/StationWithDistance";
import { buildStationWithRawDistance } from "./buildStationWithRawDistance";
import { compareStationsWithRawDistance } from "./compareStationsWithRawDistance";

export const findClosestStationsByRawDistance =
    (stations: Station[],
     location: LatLng,
     limit: number): StationWithDistance[] => {

    return stations.map(station => buildStationWithRawDistance(station, location))
        .sort(compareStationsWithRawDistance)
        .slice(0, limit);
};