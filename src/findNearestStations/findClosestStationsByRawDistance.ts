import { StationData } from '../../shared/StationData';
import { LatLng } from '../../shared/LatLng';
import { StationDataWithDistance } from "../../shared/StationDataWithDistance";
import { buildStationWithRawDistance } from "./buildStationWithRawDistance";
import { compareStationsWithRawDistance } from "./compareStationsWithRawDistance";

export const findClosestStationsByRawDistance =
    (stations: StationData[],
     location: LatLng,
     limit: number): StationDataWithDistance[] => {

    return stations.map(station => buildStationWithRawDistance(station, location))
        .sort(compareStationsWithRawDistance)
        .slice(0, limit);
};