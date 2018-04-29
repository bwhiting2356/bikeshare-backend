import { DistanceMatrixResultRow } from "./DistanceMatrixResultRow";
import { StationDataWithDistance } from "./StationDataWithDistance";

export interface StationDataWithWalking {
    walkingDistanceMatrixResult: DistanceMatrixResultRow;
    stationData: StationDataWithDistance
}