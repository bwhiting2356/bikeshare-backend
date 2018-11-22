import { SearchQuery } from "../../shared/SearchQuery";
import { StationDataWithWalking } from "../../shared/StationDataWithWalking";
import { fetchAndMergeBicyclingDistance } from "./fetchAndMergeBicyclingDistance";

import { findStartStationFirst } from "./findStartStationFirst";
import { findEndStationSecond } from "./findEndStationSecond";
import { findEndStationFirst } from "./findEndStationFirst";
import { findStartStationSecond } from "./findStartStationSecond";

export const findStations = async (
    searchQuery: SearchQuery,
    originStationsPromise: Promise<StationDataWithWalking[]>,
    destinationStationsPromise: Promise<StationDataWithWalking[]>) => {

    if (searchQuery.timeTarget === 'Depart at') {

        const stationStartPromise = findStartStationFirst(searchQuery, originStationsPromise);
        const mergedStationsWithBicyclingDataPromise =
            fetchAndMergeBicyclingDistance(destinationStationsPromise, stationStartPromise);
        const stationEndPromise = findEndStationSecond(searchQuery, stationStartPromise, mergedStationsWithBicyclingDataPromise)

        return { stationStartPromise, stationEndPromise };

    } else if (searchQuery.timeTarget === 'Arrive by') {

        const stationEndPromise = findEndStationFirst(searchQuery, destinationStationsPromise);
        const mergedStationsWithBicyclingDataPromise =
            fetchAndMergeBicyclingDistance(originStationsPromise, stationEndPromise);
        const stationStartPromise = findStartStationSecond(searchQuery, stationEndPromise, mergedStationsWithBicyclingDataPromise);

        return { stationStartPromise, stationEndPromise };

    } else {
        throw new Error("invalid time target");
    }
};