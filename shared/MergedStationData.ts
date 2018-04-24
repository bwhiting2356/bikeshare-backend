import { DistanceMatrixResultRow } from "./DistanceMatrixResultRow";
import { StationDataWithDistance } from "./StationDataWithDistance";

export interface MergedStationData {
    distanceMatrixResult: DistanceMatrixResultRow;
    stationData: StationDataWithDistance
}