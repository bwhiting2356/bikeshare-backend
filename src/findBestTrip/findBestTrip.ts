import { findClosestStationsByWalkingDistance } from "../findBestStation/findClosestStationsByWalkingDistance";
import { SearchQuery } from "../../shared/SearchQuery";
import { buildTripData} from "./buildTripData";
import { TripData } from "../../shared/TripData";
import { findStations } from "./findStations";
import { buildAndFetchWalkingDirections } from "./buildAndFetchWalkingDirections";
import { buildAndFetchBicyclingDirections } from "./buildAndFetchBicyclingDirections";

export const findBestTrip = async (searchQuery: SearchQuery): Promise<TripData> => {
    try {
        const originStationsPromise = findClosestStationsByWalkingDistance(searchQuery.origin.coords);
        const destinationStationsPromise = findClosestStationsByWalkingDistance(searchQuery.destination.coords);

        const { stationStartPromise, stationEndPromise } =
            await findStations(searchQuery, originStationsPromise, destinationStationsPromise);

        const walking1DirectionsPromise = buildAndFetchWalkingDirections(searchQuery.origin.coords, stationStartPromise);
        const walking2DirectionsPromise = buildAndFetchWalkingDirections(searchQuery.destination.coords, stationEndPromise);
        const bicyclingDirectionsPromise = buildAndFetchBicyclingDirections(stationStartPromise, stationEndPromise);

        return buildTripData(
            searchQuery,
            stationStartPromise,
            stationEndPromise,
            walking1DirectionsPromise,
            walking2DirectionsPromise,
            bicyclingDirectionsPromise)
    } catch (e) {
        throw new Error(e);
        // TODO: test this error handling
    }
};