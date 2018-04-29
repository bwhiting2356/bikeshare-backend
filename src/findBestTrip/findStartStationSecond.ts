import {findBestStation} from "../findBestStation/findBestStation";
import {LatLng} from "../../shared/LatLng";
import {StationDataWithBicycling} from "../../shared/StationDataWithBicycling";
import {BestStationResult} from "../../shared/BestStationResult";

export const findStartStationSecond = async (
    stationEndPromise: Promise<BestStationResult>,
    mergedStationsWithBicyclingDataPromise: Promise<StationDataWithBicycling[]>
) => {
    const stationEndLoc: LatLng = {
        lat: (await stationEndPromise).station.stationData.lat,
        lng: (await stationEndPromise).station.stationData.lng
    };

    return findBestStation(
        mergedStationsWithBicyclingDataPromise,
        (await stationEndPromise).reservationTime,
        stationEndLoc,
        'bicycling',
        'destination');
};