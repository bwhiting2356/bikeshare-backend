import {findBestStation} from "../findBestStation/findBestStation";
import {StationDataWithBicycling} from "../../shared/StationDataWithBicycling";
import {LatLng} from "../../shared/LatLng";
import {BestStationResult} from "../../shared/BestStationResult";

export const findEndStationSecond = async (
    stationStartPromise: Promise<BestStationResult>,
    mergedStationsWithBicyclingDataPromise: Promise<StationDataWithBicycling[]>
) => {
    const stationStartLocation: LatLng = {
        lat: (await stationStartPromise).station.stationData.lat,
        lng: (await stationStartPromise).station.stationData.lng
    };
    return findBestStation(
        mergedStationsWithBicyclingDataPromise,
        (await stationStartPromise).reservationTime,
        stationStartLocation,
        'bicycling',
        'destination');
};