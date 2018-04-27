import { LatLng } from '../../shared/LatLng';
import { StationDataWithDistance } from "../../shared/StationDataWithDistance";
import { buildStationWithRawDistance } from "./buildStationWithRawDistance";
import { compareStationsWithRawDistance } from "./compareStationsWithRawDistance";
import { StationAttributes } from "../../db/models/station/StationAttributes";

export const findClosestStationsByRawDistance =
    (stations: StationAttributes[],
     location: LatLng,
     limit: number): StationDataWithDistance[] => {

    return stations.map(station => buildStationWithRawDistance(station, location))
        .sort(compareStationsWithRawDistance)
        .slice(0, limit);
};