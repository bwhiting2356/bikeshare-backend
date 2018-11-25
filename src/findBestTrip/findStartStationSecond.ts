import { findBestStation } from "../findBestStation/findBestStation";
import { LatLng } from "../../shared/LatLng";
import { StationDataWithBicycling } from "../../shared/StationDataWithBicycling";
import { BestStationResult } from "../../shared/BestStationResult";
import { SearchQuery } from "../../shared/SearchQuery";

export const findStartStationSecond = async (
    searchQuery: SearchQuery,
    stationEndPromise: Promise<BestStationResult>,
    mergedStationsWithBicyclingDataPromise: Promise<StationDataWithBicycling[]>
) => {
    try {
        const stationEndLoc: LatLng = {
            lat: (await stationEndPromise).station.stationData.lat,
            lng: (await stationEndPromise).station.stationData.lng
        };

        return findBestStation(
            searchQuery,
            mergedStationsWithBicyclingDataPromise,
            (await stationEndPromise).reservationTime,
            stationEndLoc,
            'bicycling',
            'pickup');
    } catch (e) {
        throw new Error(e);
        // TODO: test this error handling
    }

};