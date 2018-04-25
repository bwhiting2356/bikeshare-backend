import { MergedStationData } from "../../shared/MergedStationData";

export const compareMergedStationData = (
    a: MergedStationData,
    b: MergedStationData): number => {
    if (a.distanceMatrixResult.distance && b.distanceMatrixResult.distance) {
        return a.distanceMatrixResult.distance.value - b.distanceMatrixResult.distance.value
    } else {
        return -Infinity
    }
};