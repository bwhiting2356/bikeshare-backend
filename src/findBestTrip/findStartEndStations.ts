import { SearchQuery } from "../../shared/SearchQuery";
import { findBestStation } from "../findBestStation/findBestStation";
import { StationDataWithWalking } from "../../shared/StationDataWithWalking";
import { fetchAndMergeBicyclingDistance } from "./fetchAndMergeBicyclingDistance";
import { LatLng} from "../../shared/LatLng";

export const findStartEndStations = async (
    query: SearchQuery,
    originStationsPromise: Promise<StationDataWithWalking[]>,
    destinationStationsPromise: Promise<StationDataWithWalking[]>) => {

    let stationStartPromise, stationEndPromise;

    // TODO: can I refactor this?

    if (query.timeTarget === 'Depart at') {

        stationStartPromise = findBestStation(
            originStationsPromise,
            query.datetime,
            query.origin.coords,
            'walking',
            'origin');

        const mergedStationsWithBicyclingDataPromise =
            fetchAndMergeBicyclingDistance(destinationStationsPromise, stationStartPromise);

        const stationStartLocation: LatLng = {
            lat: (await stationStartPromise).station.stationData.lat,
            lng: (await stationStartPromise).station.stationData.lng
        };

        stationEndPromise = findBestStation(
            mergedStationsWithBicyclingDataPromise,
            (await stationStartPromise).reservationTime,
            stationStartLocation,
            'bicycling',
            'destination');

    } else if (query.timeTarget === 'Arrive by') {

        stationEndPromise = findBestStation(
            destinationStationsPromise,
            query.datetime,
            query.destination.coords,
            'walking',
            'destination');

        const stationEndLoc: LatLng = {
            lat: (await stationEndPromise).station.stationData.lat,
            lng: (await stationEndPromise).station.stationData.lng
        };
        const mergedStationsWithBicyclingDataPromise =
            fetchAndMergeBicyclingDistance(originStationsPromise, stationEndPromise);

        stationStartPromise = findBestStation(
            mergedStationsWithBicyclingDataPromise,
            (await stationEndPromise).reservationTime,
            stationEndLoc,
            'bicycling',
            'destination');
    } else {
        throw new Error("invalid time target")
    }

    return { stationStartPromise, stationEndPromise };
};