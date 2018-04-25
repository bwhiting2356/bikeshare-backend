import { MergedStationData } from '../../shared/MergedStationData';
import { DistanceMatrixResultRow } from "../../shared/DistanceMatrixResultRow";
import { StationDataWithDistance } from "../../shared/StationDataWithDistance";
import { compareMergedStationData } from "./compareMergedStationData";

export const mergeDistanceMatrixResultWithStations = (
    response: DistanceMatrixResultRow[],
    stationsData: StationDataWithDistance[]): MergedStationData[] => {

    return response
        .map((row, i) => {
            return {
                distanceMatrixResult: row,
                stationData: stationsData[i]
            };
        })
        .sort(compareMergedStationData)
        .filter(mergedData => mergedData.distanceMatrixResult.status === 'OK')
};