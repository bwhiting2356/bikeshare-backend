import { DistanceMatrixResultRow } from "./DistanceMatrixResultRow";
import { StationWithDistance } from "./StationWithDistance";

export interface MergedStationData {
    distanceMatrixResult: DistanceMatrixResultRow;
    stationData: StationWithDistance
}