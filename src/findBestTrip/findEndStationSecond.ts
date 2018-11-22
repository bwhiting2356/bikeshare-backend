import { findBestStation } from "../findBestStation/findBestStation";
import { StationDataWithBicycling } from "../../shared/StationDataWithBicycling";
import { LatLng } from "../../shared/LatLng";
import { BestStationResult } from "../../shared/BestStationResult";
import { SearchQuery } from "../../shared/SearchQuery";

export const findEndStationSecond = async (
    searchQuery: SearchQuery,
    stationStartPromise: Promise<BestStationResult>,
    mergedStationsWithBicyclingDataPromise: Promise<StationDataWithBicycling[]>
) => {
    const stationStartLocation: LatLng = {
        lat: (await stationStartPromise).station.stationData.lat,
        lng: (await stationStartPromise).station.stationData.lng
    };
    return findBestStation(
        searchQuery,
        mergedStationsWithBicyclingDataPromise,
        (await stationStartPromise).reservationTime,
        stationStartLocation,
        'bicycling',
        'dropoff');
};