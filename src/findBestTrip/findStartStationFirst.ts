import { findBestStation } from "../findBestStation/findBestStation";
import { StationDataWithWalking } from "../../shared/StationDataWithWalking";
import { SearchQuery } from "../../shared/SearchQuery";

export const findStartStationFirst = async (
    originStationsPromise: Promise<StationDataWithWalking[]>,
    query: SearchQuery
) => {
    return findBestStation(
        originStationsPromise,
        query.datetime,
        query.origin.coords,
        'walking',
        'origin');
};