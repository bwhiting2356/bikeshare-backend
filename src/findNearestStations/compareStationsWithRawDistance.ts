import { StationWithDistance } from "../../shared/StationWithDistance";


export const compareStationsWithRawDistance = (a: StationWithDistance, b: StationWithDistance): number => {
    return a.distanceFromLoc - b.distanceFromLoc
};