import { SearchQuery } from "../../shared/SearchQuery";
import { StationDataWithWalking } from "../../shared/StationDataWithWalking";
import { fetchAndMergeBicyclingDistance } from "./fetchAndMergeBicyclingDistance";

import { findStartStationFirst } from "./findStartStationFirst";
import { findEndStationSecond } from "./findEndStationSecond";
import { findEndStationFirst } from "./findEndStationFirst";
import { findStartStationSecond } from "./findStartStationSecond";

export const findStations = async (
    query: SearchQuery,
    originStationsPromise: Promise<StationDataWithWalking[]>,
    destinationStationsPromise: Promise<StationDataWithWalking[]>) => {

    if (query.timeTarget === 'Depart at') {

        const stationStartPromise = findStartStationFirst(originStationsPromise, query);
        const mergedStationsWithBicyclingDataPromise =
            fetchAndMergeBicyclingDistance(destinationStationsPromise, stationStartPromise);
        const stationEndPromise = findEndStationSecond(stationStartPromise, mergedStationsWithBicyclingDataPromise)

        return { stationStartPromise, stationEndPromise };

    } else if (query.timeTarget === 'Arrive by') {

        const stationEndPromise = findEndStationFirst(destinationStationsPromise, query);
        const mergedStationsWithBicyclingDataPromise =
            fetchAndMergeBicyclingDistance(originStationsPromise, stationEndPromise);
        const stationStartPromise = findStartStationSecond(stationEndPromise, mergedStationsWithBicyclingDataPromise);

        return { stationStartPromise, stationEndPromise };

    } else {
        throw new Error("invalid time target");
    }


};