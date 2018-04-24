import { LatLng } from "../shared/LatLng";
import { TimeTarget } from "../shared/TimeTarget";
import { findClosestStationsByTravelDistance } from "./findNearestStations/findClosestStationsByTravelDistance";

export interface SearchQuery {
    origin: {
        coords: LatLng;
        address: string;
    },
    destination: {
        coords: LatLng;
        address: string;
    },
    timeTarget: TimeTarget;
    datetime: Date;
}

export const findBestTrip = async (query: SearchQuery) => {
    const nearestOriginStations = await findClosestStationsByTravelDistance(query.origin.coords)
    let nearestStation;
    for (let i = 0; i < nearestOriginStations.length; i++) {

    }

};