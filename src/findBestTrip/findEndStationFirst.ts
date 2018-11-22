import { findBestStation } from "../findBestStation/findBestStation";
import { SearchQuery } from "../../shared/SearchQuery";
import { StationDataWithWalking } from "../../shared/StationDataWithWalking";

export const findEndStationFirst = async (
    searchQuery: SearchQuery,
    destinationStationsPromise: Promise<StationDataWithWalking[]>,
) => {
    return findBestStation(
        searchQuery,
        destinationStationsPromise,
        searchQuery.datetime,
        searchQuery.destination.coords,
        'walking',
        'dropoff');
};