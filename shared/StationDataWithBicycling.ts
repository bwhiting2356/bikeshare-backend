import { DistanceMatrixResultRow } from "./DistanceMatrixResultRow";
import { StationDataWithWalking } from "./StationDataWithWalking";

export interface StationDataWithBicycling extends StationDataWithWalking {
    bicyclingDistanceMatrixResult: DistanceMatrixResultRow;
}