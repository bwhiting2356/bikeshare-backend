import { MergedStationData } from '../../shared/MergedStationData';
import { DistanceMatrixResultRow } from "../../shared/DistanceMatrixResultRow";
import { StationWithDistance } from "../../shared/StationWithDistance";
import { compareMergedStationData } from "./compareMergedStationData";

export const mergeDistanceMatrixResultWithStations = (
    response: DistanceMatrixResultRow[],
    stationsData: StationWithDistance[]): MergedStationData[] => {

    return response
        .map((row, i) => {
            return {
                distanceMatrixResult: row,
                stationData: stationsData[i]
            };
        })
        .sort(compareMergedStationData)
};