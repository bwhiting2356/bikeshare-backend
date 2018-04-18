import { LatLng } from "../../shared/LatLng";
import { buildDistanceMatrixQuery } from "./buildDistanceMatrixQuery";
import { fetchDistanceMatrix } from "./fetchDistanceMatrix";
import { getStations } from "./getStations";
import { findClosestStationsByRawDistance } from "./findClosestStationsByRawDistance";
import { mergeDistanceMatrixResultWithStations } from "./mergeDistanceMatrixResultWithStations";
import { MergedStationData } from "../../shared/MergedStationData";

export const findClosestStationsByTravelDistance = async (location: LatLng): Promise<MergedStationData[]> => {
    const stations = await getStations();
    const stationsRawDistance = findClosestStationsByRawDistance(stations, location, 10);
    const distanceMatrixQuery = buildDistanceMatrixQuery(stationsRawDistance, location);
    const results = await fetchDistanceMatrix(distanceMatrixQuery);
    return mergeDistanceMatrixResultWithStations(results, stationsRawDistance);
};