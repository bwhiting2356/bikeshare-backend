import { LatLng } from "../../shared/LatLng";
import { findClosestStationsByTravelDistance } from "./findClosestStationsByTravelDistance";

export const findNearestStation = async (location: LatLng) => {
    const nearestStations = await findClosestStationsByTravelDistance(location);
    if (!nearestStations.length) {
        throw new Error("no nearby stations")
    }

};