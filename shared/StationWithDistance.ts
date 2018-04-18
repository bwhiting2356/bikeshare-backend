import { Station } from "./Station";

export interface StationWithDistance extends Station {
    distanceFromLoc: number;
}