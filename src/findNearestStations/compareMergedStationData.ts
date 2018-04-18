import {MergedStationData} from "../../shared/MergedStationData";

export const compareMergedStationData = (
    a: MergedStationData,
    b: MergedStationData): number => {
    return a.distanceMatrixResult.distance.value - b.distanceMatrixResult.distance.value
};