import { findBestStation } from "../findBestStation/findBestStation";
import { SearchQuery } from "../../shared/SearchQuery";
import { StationDataWithWalking } from "../../shared/StationDataWithWalking";

export const findEndStationFirst = async (
    destinationStationsPromise: Promise<StationDataWithWalking[]>,
    query: SearchQuery
) => {
    return findBestStation(
        destinationStationsPromise,
        query.datetime,
        query.destination.coords,
        'walking',
        'destination');
};