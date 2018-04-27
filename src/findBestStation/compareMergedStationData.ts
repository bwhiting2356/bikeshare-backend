import { StationDataWithWalking } from "../../shared/StationDataWithWalking";

export const compareMergedStationData = (
    a: StationDataWithWalking,
    b: StationDataWithWalking): number => {
    if (a.walkingDistanceMatrixResult.distance && b.walkingDistanceMatrixResult.distance) {
        return a.walkingDistanceMatrixResult.distance.value - b.walkingDistanceMatrixResult.distance.value
    } else {
        return -Infinity
    }
};