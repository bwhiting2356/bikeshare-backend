import { LatLng } from "../../shared/LatLng";
import { getDirections } from "../googleMaps/getDirections";
import { DirectionsQuery } from "../../shared/DirectionsQuery";
import { BestStationResult } from "../../shared/BestStationResult";

export const buildAndFetchWalkingDirections = async (
    coords: LatLng,
    stationPromise: Promise<BestStationResult>) => {
    const walking2DirectionsQuery: DirectionsQuery = {
        origin:  coords,
        destination: {
            lat: (await stationPromise).station.stationData.lat,
            lng: (await stationPromise).station.stationData.lng,
        },
        mode: 'walking'
    };
    return getDirections(walking2DirectionsQuery);
};