import { StationAttributes } from "../db/models/station/StationAttributes";

export interface StationDataWithDistance extends StationAttributes {
    distanceFromLoc: number;
}