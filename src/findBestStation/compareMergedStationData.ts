import { StationDataWithWalking } from "../../shared/StationDataWithWalking";
import {SuccessRow} from "../../shared/DistanceMatrixResultRow";

export const compareMergedStationData = (
    a: StationDataWithWalking,
    b: StationDataWithWalking): number => {
    const aDistanceMatrixRow = a.walkingDistanceMatrixResult as SuccessRow;
    const bDistanceMatrixRow = b.walkingDistanceMatrixResult as SuccessRow;
    if ( aDistanceMatrixRow.distance && bDistanceMatrixRow.distance) {
        return aDistanceMatrixRow.distance.value - bDistanceMatrixRow.distance.value
    } else {
        return -Infinity
    }
};