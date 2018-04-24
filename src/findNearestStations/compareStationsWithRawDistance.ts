import { StationDataWithDistance } from "../../shared/StationDataWithDistance";


export const compareStationsWithRawDistance = (a: StationDataWithDistance, b: StationDataWithDistance): number => {
    return a.distanceFromLoc - b.distanceFromLoc
};