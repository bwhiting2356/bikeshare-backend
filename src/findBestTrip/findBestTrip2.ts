import { findClosestStationsByWalkingDistance } from "../findBestStation/findClosestStationsByWalkingDistance";
import { SearchQuery } from "../../shared/SearchQuery";
import { buildTripData} from "./buildTripData";
import { TripData } from "../../shared/TripData";
import { findStartEndStations } from "./findStartEndStations";
import { buildAndFetchWalkingDirections } from "./buildAndFetchWalkingDirections";
import { buildAndFetchBicyclingDirections } from "./buildAndFetchBicyclingDirections";

export const findBestTrip = async (query: SearchQuery): Promise<TripData> => {
    const originStationsPromise = findClosestStationsByWalkingDistance(query.origin.coords);
    const destinationStationsPromise = findClosestStationsByWalkingDistance(query.destination.coords);

    const { stationStartPromise, stationEndPromise } =
        await findStartEndStations(query, originStationsPromise, destinationStationsPromise);

    const walking1DirectionsPromise = buildAndFetchWalkingDirections(query.origin.coords, stationStartPromise);
    const walking2DirectionsPromise = buildAndFetchWalkingDirections(query.destination.coords, stationEndPromise);
    const bicyclingDirectionsPromise = buildAndFetchBicyclingDirections(stationStartPromise, stationEndPromise);

    return buildTripData(
        query,
        stationStartPromise,
        stationEndPromise,
        walking1DirectionsPromise,
        walking2DirectionsPromise,
        bicyclingDirectionsPromise)
};