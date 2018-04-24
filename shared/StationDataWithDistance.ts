import { StationData } from "./StationData";

export interface StationDataWithDistance extends StationData {
    distanceFromLoc: number;
}