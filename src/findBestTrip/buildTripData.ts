import { BestStationResult } from "../../shared/BestStationResult";
import { DirectionsResponse } from "../../shared/DirectionsResponse";
import { TripData } from "../../shared/TripData";
import { SearchQuery } from "../../shared/SearchQuery";
import { subtractSeconds } from "../helpers/subtractSeconds";
import { SuccessRow } from "../../shared/DistanceMatrixResultRow";
import { addSeconds } from "../helpers/addSeconds";
import { calculateReservationPrice } from "./calculateReservationPrice";
import { calculateBicyclingRentalFee } from "./calculateBicyclingRentalFee";
import { calculateArrivalTime } from "./calculateArrivalTime";
import { calculateDepartureTime } from "./calculateDepartureTime";

export const buildTripData = async (
    query: SearchQuery,
    stationStartPromise: Promise<BestStationResult>,
    stationEndPromise: Promise<BestStationResult>,
    walking1DirectionsPromise: Promise<DirectionsResponse>,
    walking2DirectionsPromise: Promise<DirectionsResponse>,
    bicyclingDirectionsPromise: Promise<DirectionsResponse>
): Promise<TripData> => {
    try {
        const stationStartResult = await stationStartPromise;
        const stationEndResult = await stationEndPromise;
        const walking1Travel = await walking1DirectionsPromise;
        const walking2Travel = await walking2DirectionsPromise;

        const departureTime: Date = calculateDepartureTime(query, stationStartResult);
        const arrivalTime: Date = calculateArrivalTime(query, stationEndResult);

        const stationStart = {
            id: stationStartResult.station.stationData.id,
            coords: {
                lat: stationStartResult.station.stationData.lat,
                lng: stationStartResult.station.stationData.lng
            },
            address: stationStartResult.station.stationData.address,
            price: calculateReservationPrice(
                stationStartResult.availability.value as number,
                stationStartResult.station.stationData.capacity,
                'pickup'),
            time: addSeconds(
                departureTime,
                (stationStartResult.station.walkingDistanceMatrixResult as SuccessRow).duration.value)
        };

        const bicyclingTravel = {
            ...(await bicyclingDirectionsPromise),
            price: calculateBicyclingRentalFee((await bicyclingDirectionsPromise).seconds)
        };

        const stationEnd = {
            id: stationEndResult.station.stationData.id,
            coords: {
                lat: stationEndResult.station.stationData.lat,
                lng: stationEndResult.station.stationData.lng
            },
            address: stationEndResult.station.stationData.address,
            price: calculateReservationPrice(
                stationEndResult.availability.value as number,
                stationEndResult.station.stationData.capacity,
                'dropoff'),
            time: subtractSeconds(
                arrivalTime,
                (stationEndResult.station.walkingDistanceMatrixResult as SuccessRow).duration.value)
        };

        return {
            origin: query.origin,
            destination: query.destination,
            departureTime,
            arrivalTime,
            walking1Travel,
            walking2Travel,
            bicyclingTravel,
            stationStart,
            stationEnd,
            status: 'test'
        };
    } catch (e) {
        throw new Error(e);
        // TODO: test this error handling
    }
};