import { getDirections } from "../googleMaps/getDirections";
import { DirectionsQuery } from "../../shared/DirectionsQuery";
import { BestStationResult } from "../../shared/BestStationResult";

export const buildAndFetchBicyclingDirections = async (
    stationStartPromise: Promise<BestStationResult>,
    stationEndPromise: Promise<BestStationResult>) => {

    const bicyclingDirectionsQuery: DirectionsQuery = {
        origin:  {
            lat: (await stationStartPromise).station.stationData.lat,
            lng: (await stationStartPromise).station.stationData.lng
        },
        destination: {
            lat: (await stationEndPromise).station.stationData.lat,
            lng: (await stationEndPromise).station.stationData.lng,
        },
        mode: 'bicycling'
    };

    return getDirections(bicyclingDirectionsQuery);
};