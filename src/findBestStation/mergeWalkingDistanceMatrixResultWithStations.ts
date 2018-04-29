import { StationDataWithWalking } from '../../shared/StationDataWithWalking';
import { DistanceMatrixResultRow } from "../../shared/DistanceMatrixResultRow";
import { StationDataWithDistance } from "../../shared/StationDataWithDistance";
import { compareMergedStationData } from "./compareMergedStationData";

export const mergeWalkingDistanceMatrixResultWithStations = (
    response: DistanceMatrixResultRow[],
    stationsData: StationDataWithDistance[]): StationDataWithWalking[] => {

    return response
        .map((row, i) => {
            return {
                walkingDistanceMatrixResult: row,
                stationData: stationsData[i]
            };
        })
        .filter(mergedData => mergedData.walkingDistanceMatrixResult.status !== 'ZERO_RESULTS')
        .sort(compareMergedStationData)
};