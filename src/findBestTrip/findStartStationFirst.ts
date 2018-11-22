import { findBestStation } from "../findBestStation/findBestStation";
import { StationDataWithWalking } from "../../shared/StationDataWithWalking";
import { SearchQuery } from "../../shared/SearchQuery";

export const findStartStationFirst = async (
    searchQuery: SearchQuery,
    originStationsPromise: Promise<StationDataWithWalking[]>,
) => {
    return findBestStation(
        searchQuery,
        originStationsPromise,
        searchQuery.datetime,
        searchQuery.origin.coords,
        'walking',
        'pickup');
};